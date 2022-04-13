const vue = require('vue/compiler-sfc');

module.exports = class extends global.ProcessorsExtenderSinglyPreprocessor {
    async _preprocessSource(source) {
        try {
            const extensions = new Map();
            const {errors, descriptor} = vue.parse(source.content, {});
            if (errors?.length) return {errors};

            let {script, styles} = descriptor;
            script?.content && extensions.set('ts', {code: script.content, map: script.map});

            styles = styles?.[0];
            styles?.content && extensions.set('sass', {code: styles.content, map: styles.map});
            return {extensions};
        }
        catch (exc) {
            console.log(exc.stack);
            return {errors: [exc.message]};
        }
    }
}
