const {crc32} = global.utils;

module.exports = function (files, overwrites, functions) {
    const compute = {functions: functions ? functions.code : '', files: {}, overwrites: {}};

    files.forEach(source => compute.files[source.relative.path] = source.hash);
    overwrites && overwrites.forEach(source => compute.overwrites[source.relative.path] = source.hash);

    return crc32(JSON.stringify(compute));
}
