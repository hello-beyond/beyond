const {crc32} = global.utils;

module.exports = function (analyzer, options) {
    const compute = {files: {}, options: options.hash};

    analyzer.forEach(source => compute.files[source.relative.path] = source.hash);
    return crc32(JSON.stringify(compute));
}
