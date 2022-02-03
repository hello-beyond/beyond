module.exports = {
    name: 'svelte',
    sources: {
        extname: ['.svelte']
    },
    extender: {
        Preprocessor: require('./preprocessor'),
        Compiler: require('./compiler'),
        extends: ['ts', 'sass']
    }
};
