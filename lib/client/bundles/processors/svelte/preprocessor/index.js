const svelte = require('svelte/compiler');
const Source = require('./source');

module.exports = class extends global.ProcessorsExtenderPreprocessor {
    async _preprocess(updated, request) {
        const ts = updated.get('ts');
        const sass = updated.get('sass');

        for (const source of this.files.values()) {
            const {file} = source.relative;
            if (this.has(file) && this.get(file).original.hash === source.hash) {
                ts.set(file, this.get(file));
                continue;
            }

            await svelte.preprocess(source.content, {
                script: ({content}) => {
                    content && ts.set(file, new Source('source', source, content));
                },
                style: ({content}) => {
                    content && sass.set(file, new Source('source', source, content));
                }
            }, {
                filename: source.file
            });
            if (this._request !== request) return;
        }
    }
}
