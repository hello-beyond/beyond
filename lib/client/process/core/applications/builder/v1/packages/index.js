const {fs} = global.utils;
module.exports = async function (modules, builder, paths, staticEntries, externals, distribution) {
    const platforms = distribution.npm ? Object.keys(distribution.npm.platforms) : [distribution.platform];
    const find = platforms.find(p => p === 'backend');
    const exports = {};
    if (find) exports['./actions.specs.json'] = './actions.specs.json';

    const promises = [];
    modules.exported.forEach((entry, exp) => {
        if (!distribution.npm) {
            exports[`./${exp}`] = `./${exp}.js`;
            return;
        }

        const {bundleRname, extensions} = entry;
        const exportsJson = {types: `./${bundleRname}.d.ts`};
        exports[`./${bundleRname}`] = {types: `./${bundleRname}/${bundleRname}.d.ts`};
        extensions.forEach(ext => {
            if (ext === 'mjs') {
                exportsJson.import = `./${bundleRname}.mjs`;
                exportsJson.module = `./${bundleRname}.mjs`;
                exports[`./${bundleRname}`] = {
                    ...exports[`./${bundleRname}`],
                    ...{import: `./${bundleRname}/${bundleRname}.mjs`, module: `./${bundleRname}/${bundleRname}.mjs`}
                };
                return;
            }

            const type = ext === 'amd.js' ? 'amd' : 'require';
            exportsJson[type] = `./${bundleRname}.${ext}`;
            exports[`./${bundleRname}`][type] = `./${bundleRname}/${bundleRname}.${ext}`;
        });

        const path = require('path').join(paths.www, bundleRname, 'package.json')
        promises.push(fs.save(path, JSON.stringify(exportsJson, null, 2)));
    });
    await Promise.all(promises);

    const statics = {};
    const cleanEntry = entry => {
        const i = entry.split('.');
        return i.slice(0, i.length - 1).join('.');
    };

    for (const entry of Object.values(staticEntries)) {
        entry && entry.forEach(i => statics[cleanEntry(i)] = i);
    }

    const dependencies = await require('./dependencies')(builder, distribution);
    const {application: {name, scope, description, version, author, license}} = builder;

    const pJson = {
        name: `@${scope}/${name}`, author: author,
        version: version, description: description, license: license,
        keywords: [], static: statics, exports, dependencies,
        uimport: externals.all.size ? [...externals.all.values()] : true,
        clientDependencies: externals.client.size ? [...externals.client.values()] : []
    };

    const target = require('path').join(paths.www, 'package.json');
    await fs.save(target, JSON.stringify(pJson, null, 2));
}