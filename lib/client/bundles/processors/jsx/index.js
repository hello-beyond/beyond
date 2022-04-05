module.exports = {
    name: 'jsx',
    sources: {
        extname: '.jsx'
    },
    Dependencies: require('./dependencies'),
    packager: {
        compiler: () => require('./compiler'),
        Js: require('./code')
    }
};
