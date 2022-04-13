const log = false;

/**
 * For development debugging
 *
 * @param dp {object} The parent dynamic processor
 * @param child {object} The child processor
 */
module.exports = function (dp, child) {
    if (!log) return;

    if ( // dp.dp !== 'processor.extender.preprocessor' ||
        dp.packager?.id !== 'application//2867990454//home/home-react//widget//ts//295973477//.') return;

    console.log(
        `Processor "${dp.dp}" reevaluation...\n` +
        (child ? `\tEmitted by: "${child.dp}":"${child.id ? child.id : 'no child id'}". ` : '') +
        `\tIdentifiers: (dp: ${dp.autoincremented}) - (child: ${child ? child.autoincremented : 'no child'})`);
}
