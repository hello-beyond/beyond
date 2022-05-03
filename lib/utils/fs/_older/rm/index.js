/**
 * Recursively remove all files and directories of a target folder
 */
module.exports = async function (target) {
    'use strict';

    const rm = async function (target) {
        if ((await fs.stat(target)).isFile()) {
            await fs.unlink(target);
            return;
        }

        await fs.rm(target, {recursive: true});
    }

    if (!await fs.exists(target)) return;
    await rm(target);
}
