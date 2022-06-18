const {minify} = require('uglify-js');

module.exports = async function (baseDir, application, distribution) {
    const baseUrl = `${baseDir}packages`;
    const pkg = application.package;

    let code = '\n';
    code += distribution.local ? 'requirejs.config({waitSeconds: 30});\n' : '';
    code += `const baseDir = window.baseDir = '${baseDir}';\n`;
    code += 'const baseUrl = window.baseUrl = (() => {\n';
    code += '    const {protocol, host, pathname} = location;\n';
    code += '    if (protocol === \'file:\') {\n';
    code += '        const path = pathname.split(\'/\');\n';
    code += '        path.pop(); // Remove \'index.html\'\n';
    code += '        path.join(\'/\');\n';
    code += '        return `${protocol}//${path.join(\'/\')}`;\n';
    code += '    }\n';
    code += '    else {\n';
    code += '        const baseUrl = baseDir === \'/\' ? \'\' : baseDir;\n';
    code += '        return `${protocol}//${host}${baseUrl}`;\n';
    code += '    }\n';
    code += '})();\n';
    code += `const paths = {'${pkg}': baseUrl};\n`;
    code += `requirejs.config({baseUrl: '${baseUrl}', paths});\n`;

    // Load the widgets.js script
    const main = [];
    if (application.engine !== 'legacy') {
        main.push('@beyond-js/widgets/render/ts');
        main.push('@beyond-js/widgets/application/ts');
        main.push('@beyond-js/widgets/layout/ts');
    }
    else {
        main.push('@beyond-js/kernel/styles/ts');
    }

    main.push(`${application.package}/start`);
    distribution.local && distribution.development.tools && main.push('@beyond-js/local/main/ts');
    code += `require(${JSON.stringify(main)});\n\n`;

    // Fetch the ssr page
    await (async () => {
        if (!distribution.ssr || !application.routing.ssr) return;

        const {distributions} = application.deployment;
        await distributions.ready;
        const found = [...distributions.values()].find(({name}) => distribution.ssr === name);
        if (!found) return;

        const name = `${application.package}/${found.name}`;
        const port = distribution.local ? await require('./ports').get(name) : void 0;
        const host = distribution.local ? `http://localhost:${port}` : found.host;

        code += 'uri = `${location.pathname}${location.search}`;\n';
        code += 'let language = localStorage.__beyond_language;\n';
        code += 'language = language ? language : navigator.language;\n';
        const url = `\`${host}/page?uri=\${uri}&language=\${language}\``;
        const options = {mode: 'cors'};
        code += `window.__ssr_fetch = new Promise(resolve => {\n` +
            `    fetch(${url}, ${JSON.stringify(options)})\n` +
            '        .then(response => response.json())\n' +
            '        .then(json => resolve({json}))\n' +
            '        .catch(exc => resolve({error: exc.message}));\n' +
            '    });\n';
    })();

    return distribution.minify.js ? minify(code).code : code;
}
