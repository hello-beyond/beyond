window.beyond.phonegap = new function () {
    'use strict';

    const promise = Promise.pending();
    Object.defineProperty(this, 'ready', {'get': async () => await promise});

    document.addEventListener('deviceready', () => promise.resolve(true));

};
