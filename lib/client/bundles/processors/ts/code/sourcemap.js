module.exports = class {
    #concat;

    constructor() {
        this.#concat = new (require('concat-with-sourcemaps'))(true, 'ts.map.js', '\n');
    }

    get code() {
        return this.#concat.content.toString();
    }

    #map;
    get map() {
        if (this.#map) return this.#map;
        return this.#map = JSON.parse(this.#concat.sourceMap);
    }

    concat(code, file, map) {
        if (!code) return;
        this.#map = undefined;

        if (!file) {
            this.#concat.add(null, code);
            return;
        }

        // Set the sourceRoot
        if (map) {
            let parsed;
            try {
                parsed = typeof map === 'string' ? JSON.parse(map) : map;
            }
            catch (exc) {
                console.warn(`Error parsing source map of file ${file}`);
                this.#concat.add(file, code, map);
                return;
            }

            const sources = parsed.sources;
            if (sources.length === 0 || sources.length > 1) {
                this.#concat.add(file, code, map);
                return;
            }

            const {sep} = require('path');
            const split = file.split(sep);
            split.pop();

            parsed.sourceRoot = split.join('/');
            map = parsed;
        }

        this.#concat.add(file, code, map);
    }
}
