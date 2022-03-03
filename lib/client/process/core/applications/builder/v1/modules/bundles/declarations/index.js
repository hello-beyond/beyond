const rPath = require("path");
const fs = require('fs').promises;

declarations = new Map();
module.exports = async function (bundle, path) {
    const processed = new Set();
    const processDeclaration = async declaration => {
        if (processed.has(declaration.id)) return;

        const dependencies = declaration.packager.dependencies;
        await dependencies.ready;

        const promises = [];
        dependencies.forEach(dependency => promises.push(dependency.ready));
        await Promise.all(promises);

        for (const dependency of dependencies.values()) {
            if (!dependency.valid) continue;
            if (dependency.kind !== 'bundle') continue;
            const {bundle} = dependency;
            const {application, platforms} = bundle.container;
            const distribution = await require('./distribution')(application, bundle, platforms);
            if (!distribution) continue;
            const {declaration} = bundle.packagers.get(distribution);
            await processDeclaration(declaration);
        }

        await declaration.ready;
        const {id, valid, code} = declaration

        if (!valid) return;
        try {
            const dest = require('path').join(path, `${declaration.packager.bundle.name}.d.ts`);
            !!code && await fs.writeFile(dest, code, 'utf8');
        }
        catch (exc) {
            console.error(exc.message);
            return;
        }

        processed.add(id);
        declarations.set(id, declaration);
    }

    const {application, platforms} = bundle.container;
    const distribution = await require('./distribution')(application, bundle, platforms);
    if (!distribution) return;
    const {declaration} = bundle.packagers.get(distribution);

    return processDeclaration(declaration);
}