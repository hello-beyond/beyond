/**
 * Native BeyondJS processors
 */

const processors = [];

try {
    processors.push(require('./js'));
    processors.push(require('./ts'));
    processors.push(require('./jsx'));
    processors.push(require('./css/less'));
    processors.push(require('./css/scss'));
    processors.push(require('./txt'));
    // processors.push(require('./html-vue'));
}
catch (exc) {
    console.error(exc.stack);
    processors.length = 0;
}

module.exports = processors;
