const {fs} = global.utils;
const p = require('path');
const EXTENSIONS = {es6: 'mjs', cjs: 'cjs', amd: 'amd'};
/**
 * Build a bundle of a module
 *
 * @param extname {string} Can be '.js' or '.css'
 * @param specs {object} {path, module, bundle, distribution, language, uglifier, builder, exports, externals}
 * @specs path {string} The build target path
 * @specs module {object} The module
 * @specs bundle {object} The bundle being exported
 * @specs distribution {object} The distribution specification
 * @specs language {string} The language
 * @specs uglifier {object}
 * @specs builder {object} The builder object
 * @specs exports {Map<string>} The resources being exported
 * @specs externals {object:{all:Set<string>, client:Set<string>}} The externals resources
 * @return {Promise<void>}
 */
module.exports = async function (extname, specs) {
    const {path, module, bundle, distribution, language, uglifier, builder, exports, externals} = specs;

    const packagers = new Map();
    const modulePlatforms = [...module.platforms.keys()];
    const resourcePath = p.join(path, module.pathname);

    const setPackager = (platform, mode) => {
        const key = `${platform}//${mode}`;
        //TODO agregar la distribucion de la plataforma a la que corresponda, caso NPM
        const dist = Object.assign({},
            distribution, {key: key, platform: platform, bundles: {mode: mode}}
        );
        delete dist.npm;
        delete dist.platforms;

        packagers.set(key, bundle.packagers.get(dist, language));
    };

    const {npm, platform} = distribution;
    const compilePlatforms = npm?.platforms ? npm?.platforms : platform;
    for (const platform of Object.keys(compilePlatforms)) {
        if (global.platforms.webAndMobile.includes(platform) && modulePlatforms.includes(platform)) {
            setPackager(platform, 'amd');
            continue;
        }

        if (!modulePlatforms.includes(platform)) continue;
        setPackager(platform, 'es6');
        setPackager(platform, 'cjs');
    }

    const promises = [];
    packagers.forEach(packager => packager.js && promises.push(packager.js.ready));
    await Promise.all(promises);

    const save = async (target, code) => {
        if (!distribution.compress) return fs.save(target, code.code());

        let errors;
        ({code, errors} = uglifier.uglify(target, code.code()));
        errors && builder.emit('error', `  . Error uglifying bundle "${bundle.pathname}"`);
        errors?.forEach(({message, line, col}) => builder.emit('error', `    -> [${line}, ${col}] ${message}`));
        !errors && await fs.save(target, code);
    };

    await fs.mkdir(resourcePath, {'recursive': true});
    const bName = bundle.rname + (language ? `.${language}` : '');

    const items = {bundleRname: bName, extensions: []};
    promises.size = 0;
    packagers.forEach((packager, key) => {
        if (!packager.js) return;

        const code = packager.js;
        if (!code.valid) {
            builder.emit('error', `  . Bundle "${bundle.pathname}" is not valid`);
            return;
        }

        if (!code.code() || !code.processorsCount) return;

        const type = key.split('//')[1];
        const extension = type === 'es6' ? 'mjs' : `${EXTENSIONS[type]}.js`;
        items.extensions.push(extension)
        const target = p.join(resourcePath, `${bName}.${extension}`);
        promises.push(save(target, code));
    });
    await Promise.all(promises);

    exports.set(bundle.resource, items);

    promises.size = 0;
    packagers.forEach(packager => {
        if (!packager.js) return;
        const code = packager.js;
        if (!code.valid || !code.code() || !code.processorsCount) return;

        promises.push(require('./externals')(packager, distribution, externals));
    });
    await Promise.all(promises);

    await require('./declarations')(bundle, path);
}