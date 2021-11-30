const {crc32} = global.utils;

module.exports = function (dependencies, analyzer, options) {
    const compute = {dependencies: {}, files: {}, options: options.hash.value};

    dependencies.forEach(({resource, declaration}) => compute.dependencies[resource] = declaration.hash);
    analyzer.forEach(source => compute.files[source.relative.file] = source.hash);

    return crc32(JSON.stringify(compute));
}
