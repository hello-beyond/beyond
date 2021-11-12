/**
 *
 * @param id
 * @param item
 * @param moduleRoute
 * @returns {object}
 */
module.exports = function (id, item, moduleRoute) {
    const file = item.file.toJSON();
    const pathname = `/${moduleRoute}/static/${file.relative?.file}`;
    const output = {
        id: `${id}//${file.filename}`,
        file: file.file,
        filename: file.filename,
        dirname: file.dirname,
        basename: file.basename,
        extname: file.extname,
        pathname: pathname.replace(/\\/g, `/`),
        relative: {file: file.relative?.file, dirname: file.relative?.dirname}
    };

    if (item.overwrite) {
        const overwrite = item.overwrite.toJSON();
        output.overwrite = {
            file: overwrite.file,
            filename: overwrite.filename,
            dirname: overwrite.dirname,
            basename: overwrite.basename,
            extname: overwrite.extname,
            relative: {file: overwrite.relative?.file, dirname: overwrite.relative?.dirname}
        };
    }

    return output;
}