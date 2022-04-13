const svelte = require('svelte/compiler');

module.exports = class extends global.ProcessorsExtenderSinglyPreprocessor {
    async _preprocessSource(source) {
        try {
            const extensions = new Map();
            await svelte.preprocess(source.content, {
                script: x => extensions.set('ts', {code: x.content}) && void 0,
                style: y => extensions.set('sass', {code: y.content}) && void 0
            }, {filename: source.file});

            return {extensions};
        }
        catch (exc) {
            console.log(exc.stack);
            return {errors: [exc.message]};
        }
    }
}
