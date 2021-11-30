const resolve = require('resolve-package-path');

module.exports = function (pkg, application) {
    const split = pkg.split('/');
    pkg = split.length === 1 || !split[0].startsWith('@') ? split.shift() : split.splice(0, 2).join('/');
    const subpath = split.length ? split.join('/') : void 0;

    const find = (pkg) => {
        try {
            const resolved = resolve(pkg, application.path);
            if (!resolved) return {errors: [`Package ${pkg} not found`]};

            // Read the package.json
            const json = require(resolved);

            // The path comes with the '/package.json' in it
            const path = require('path').resolve(resolved, '..');

            return {path, json};
        }
        catch (exc) {
            return {errors: [exc.message]};
        }
    }

    let {errors, path, json} = find(pkg);
    if (errors) return {errors};

    const done = ({errors, path, json}) => {
        if (errors) return {errors};

        let {module, browser, typings, types} = json;
        module = module ? module : browser;
        typings = typings ? typings : types;

        return {path, module, typings};
    }

    const {exports} = json;
    if (subpath) {
        if (exports && !exports.hasOwnProperty(`./${subpath}`)) {
            return {errors: [`External does not exports subpath "${subpath}"`]};
        }

        const {errors, path, json} = find(`${pkg}/${subpath}`);
        return done({errors, path, json});
    }

    return done({path, json});
}
