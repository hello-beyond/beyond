const fs = require('fs');
const archiver = require('archiver');

module.exports = (application, source, destination, events) => new Promise((resolve, reject) => {
    'use strict';

    const output = fs.createWriteStream(destination);
    const archive = archiver('zip', {
        'store': true // Sets the compression method to STORE
    });

    output.on('close', function () {
        events.emit('message', `Application "${application.name}" has been archived, ` +
            `${archive.pointer()} bytes processed`);
        resolve();
    });

    archive.on('error', function (err) {
        events.emit('error', err);
        reject(err);
    });

    archive.pipe(output);
    archive.directory(source, false);
    archive.finalize();
});
