const fs = require('fs');
const archiver = require('archiver');

module.exports = (application, source, destination) => new Promise((resolve, reject) => {
    'use strict';

    const output = fs.createWriteStream(destination);
    const archive = archiver('zip', {
        'store': true // Sets the compression method to STORE
    });

    output.on('close', function () {
        application.emit('message', `Application "${application.name}" has been archived, ` +
            `${archive.pointer()} bytes processed`);
        resolve();
    });

    archive.on('error', function (err) {
        application.emit('error', err);
        reject(err);
    });

    archive.pipe(output);
    archive.directory(source, false);
    archive.finalize();
});
