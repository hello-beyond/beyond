const fs = require('fs').promises;
const processed = new Set();

const getDeclaration = async bundle => {
    const {application, platforms} = bundle.container;
    const distribution = await require('./distribution')(application, bundle, platforms);
    if (!distribution) return;
    const {declaration, processors} = bundle.packagers.get(distribution);
    await processors.ready;
    const processor = processors.get('ts');
    await processor.options.ready;

    return {declaration: declaration, tsconfig: processor.options.content}
}

module.exports = async function (bundle, path) {
    // console.log(1, bundle.id)
    const processDeclaration = async (declaration, tsConfig) => {
        if (processed.has(declaration.id)) return;

        const {dependencies} = declaration.packager;
        await dependencies.ready;

        const promises = [];
        dependencies.forEach(dependency => promises.push(dependency.ready));
        await Promise.all(promises);

        for (const dependency of dependencies.values()) {
            if (!dependency.valid) continue;
            if (dependency.kind !== 'bundle') continue;
            const declaration = await getDeclaration(dependency.bundle);
            await processDeclaration(declaration.declaration, declaration.tsconfig);
        }

        await declaration.ready;
        const {id, valid, code, errors} = declaration;
        if (!valid || errors.length) return;

        try {
            const dest = require('path').join(path, `${declaration.packager.bundle.name}.d.ts`);
            await fs.writeFile(dest, code, 'utf8');

            const destTs = require('path').join(path, `tsconfig.json`);
            await fs.writeFile(destTs, tsConfig, 'utf8');

            processed.add(id);
            // console.log(2, 'save', id)
        }
        catch (exc) {
            console.error(exc.message);
        }
    }

    const declaration = await getDeclaration(bundle);
    return processDeclaration(declaration.declaration, declaration.tsconfig);
}