// Update the package or exports in HMR
const update = (() => {
    if (!hmr) return '';

    let update = '';
    const {name} = this.#packager.processor;
    update = name === 'ts' ? `\n__pkg.update(modules);\n` : update;
    update = name === 'txt' ? `\n__pkg.exports.update();\n` : update;
    return update;
})();
