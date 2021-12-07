/**
 * Recursively remove all files and directories of a target folder
 */
module.exports = fs => async function (target) {
    'use strict';

    const rm = async function (target) {

        if ((await fs.stat(target)).isFile()) {
            await fs.unlink(target);
            return;
        }

        let files = await fs.readdir(target);
        for (let file of files) {

            let to = require('path').join(target, file);
            let stat = await fs.stat(to);
            if (stat.isDirectory()) {
                await rm(to);
            }
            else if (stat.isFile()) {
                await fs.unlink(to);
            }

        }

        await fs.rm(target, {recursive: true});

    };

    if (!await fs.exists(target)) return;
    await rm(target);

};
