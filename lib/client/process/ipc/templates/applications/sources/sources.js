/**
 *
 * @param id
 * @param sources
 * @returns [{object}]
 */
module.exports = function (id, sources) {
    return [...sources.values()].map(source => {
        //TODO utilizar el id del source, luego del fix para que se le agregue el id de la aplicacion
        return {
            // id: source.id,
            id: `${id}//${source.filename}`,
            code: source.content,
            file: source.file,
            filename: source.filename,
            dirname: source.dirname,
            basename: source.basename,
            extname: source.extname,
            relative: {file: source.relative?.file, dirname: source.relative?.dirname}
        }
    });
}