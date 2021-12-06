/**
 *
 * @param id
 * @param processorName
 * @param item
 * @returns {object}
 */
module.exports = function (id, processorName, item) {
    //TODO utilizar el id del source, luego del fix para que se le agregue el id de la aplicacion
    return {
        // id: item.id,
        id: `${id}//${item.filename}`,
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