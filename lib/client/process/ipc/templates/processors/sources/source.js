/**
 *
 * @param id
 * @param processorName
 * @param item
 * @returns {object}
 */
module.exports = function (id, processorName, item) {
    return {
        id: item.id,
        processor: processorName,
        code: item.content,
        file: item.file,
        filename: item.filename,
        dirname: item.dirname,
        basename: item.basename,
        extname: item.extname,
        errors: [],
        warnings: [],
        relative: {file: item.relative.file, dirname: item.relative.dirname}
    }
}