const {fs} = global.utils;
const p = require('path');
/**
 * Build a bundle of a module
 *
 * @param extname {string} Can be '.js' or '.css'
 * @param path {string} The build target path
 * @param module {object} The module
 * @param bundle {object} The bundle being exported
 * @param distribution {object} The distribution specification
 * @param language {string} The language
 * @param uglifier {object}
 * @param builder {object} The builder object
 * @param exports {Set<string>} The resources being exported
 * @param externals {Set<string>} The externals resources
 * @return {Promise<void>}
 */
const EXTENSIONS = {es6: 'mjs', cjs: 'cjs', amd: 'amd'};
module.exports = async function (extname, path, module, bundle, distribution, language, uglifier, builder, exports, externals) {
    const packagers = new Map();
    const platforms = [...module.platforms.keys()];

    const setPackager = (platform, mode) => {
        const key = `${platform}//${mode}`;
        const dist = Object.assign({}, distribution, {key: key, platform: platform, bundles: {mode: mode}});
        delete dist.npm;
        delete dist.platforms;

        packagers.set(key, bundle.packagers.get(dist, language));
    };

    const clientPlatforms = ['web', 'android', 'ios', 'web.ssr'];
    for (const platform of Object.keys(distribution.platforms)) {
        if (clientPlatforms.includes(platform) && platforms.includes(platform)) {
            setPackager(platform, 'amd');
            continue;
        }

        if (!platforms.includes(platform)) continue;
        setPackager(platform, 'es6');
        setPackager(platform, 'cjs');
    }

    const promises = [];
    packagers.forEach(packager => packager.js && promises.push(packager.js.ready));
    await Promise.all(promises);

    const bundlePath = p.join(path, module.pathname, bundle.name);
    await fs.mkdir(bundlePath, {'recursive': true});
    const save = async (target, code) => {
        if (!distribution.compress) return fs.save(target, code.code());

        let errors;
        ({code, errors} = uglifier.uglify(target, code.code()));
        errors && builder.emit('error', `  . Error uglifying bundle "${bundle.pathname}"`);
        errors?.forEach(({message, line, col}) => builder.emit('error', `    -> [${line}, ${col}] ${message}`));
        !errors && await fs.save(target, code);
    };

    promises.size = 0;
    packagers.forEach((packager, key) => {
        if (!packager.js) return;

        const code = packager.js;
        if (!code.valid) {
            builder.emit('error', `  . Bundle "${bundle.pathname}" is not valid`);
            return;
        }
        if (!code.code() || !code.processorsCount) return;

        const bName = bundle.name + (language ? `.${language}` : '');
        const bExported = p.join(module.pathname, bName);
        exports.set(bExported.replace(/\\/g, '/'), bName);

        const type = key.split('//')[1];
        const extension = type === 'es6' ? 'mjs' : `${EXTENSIONS[type]}.js`;
        const bundlePath = p.join(path, module.pathname, bName);
        const target = p.join(bundlePath, `${bName}.${extension}`);
        promises.push(save(target, code));
    });
    await Promise.all(promises);

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