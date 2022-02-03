module.exports = function (compiled) {
    let moduleId = compiled.relative.file.replace(/\\/g, '/');
    moduleId = `./${moduleId}`;

    const extensions = ['.ts', '.map', '.d.ts', '.js', '.tsx', '.svelte'];
    for (const ext of extensions) {
        if (moduleId.endsWith(ext)) {
            return moduleId.substr(0, moduleId.length - ext.length)
        }
    }

    return moduleId;
}
