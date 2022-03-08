module.exports = {
    name: 'vue',
    sources: {
        extname: ['.vue']
    },
    Dependencies: require('./dependencies'),
    extender: {
        Preprocessor: require('./preprocessor'),
        extends: ['ts', 'sass']
    },
    packager: {
        compiler: () => require('./compiler'),
        Js: require('./js'),
        Css: require('./css')
    }
};
