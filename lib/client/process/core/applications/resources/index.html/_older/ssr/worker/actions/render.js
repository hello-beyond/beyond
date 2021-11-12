const ReactDOMServer = require('react-dom/server.js');
const React = require('react');
const Module = require('module');

module.exports = function (message) {
    const {page} = message;
    const dependencies = new Map(message.dependencies);
    const modules = new Map();

    const brequire = module => {
        if (modules.has(module)) return modules.get(module).exports;

        let required;
        try {
            required = require(module);
        }
        catch (exc) {
            console.log(`Required module "${module}" not found`);
            return;
        }
        return required;
    }

    const process = resource => {
        const module = new Module(resource);
        const code = dependencies.get(resource);

        module.require = brequire;
        try {
            module._compile(code, resource);
        }
        catch (exc) {
            console.log(`Error on "${resource}"`, exc.stack, code);
            return;
        }
        modules.set(resource, module);
    };

    const core = '/libraries/beyond/core/ts.js';

    // Process beyond/core first as it is required by the rest of the bundles
    process(core);
    [...dependencies.keys()].forEach(resource => resource !== core && process(resource));

    // Create the page module
    const module = new Module('/page.js');
    module.require = brequire;
    module._compile(page, '/page.js');

    const {Page} = module.exports;
    const html = ReactDOMServer.renderToString(React.createElement(Page));

    // The host object extends a map that stores the emitted files
    return {html};
}
