module.exports = function (pkg, subpath, application) {
    let main = require('./find')(pkg, application);
    let {errors, path, json} = main;
    if (errors) return {errors};

    if (!path) return {resource: new global.Resource({'404': `Package "${pkg}" not found`})};
    if (!json.uimport) return {resource: new global.Resource({'404': `Package "${pkg}" exists but it is not defined as universal`})};
    if (!subpath) return {path, json};

    if (json.static?.hasOwnProperty(`./${subpath}`)) {
        const file = require('path').join(path, json.static[`./${subpath}`]);
        return {resource: new global.Resource({file})};
    }

    const {exports} = json;
    if (!exports?.hasOwnProperty(`./${subpath}`)) {
        return {errors: [`External does not exports subpath "./${subpath}"`]};
    }

    return {path: main.path, json: main.json.exports[`./${subpath}`]};
}
