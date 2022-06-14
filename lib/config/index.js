module.exports = function (root) {
    'use strict';

    const beyond = new global.utils.fs.Reader(root, 'beyond.json');

    let content;
    Object.defineProperty(this, 'content', {'get': () => content});

    this.load = async function () {

        await beyond.load();
        content = beyond.valid ? beyond.content : {};

        content.port = typeof content.port === 'number' ? content.port : 3020;

    };

};
