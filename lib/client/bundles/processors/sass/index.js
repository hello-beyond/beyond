module.exports = {
    name: 'sass',
    sources: {
        overwrites: true,
        extname: '.scss'
    },
    Analyzer: require('./analyzer'),
    Dependencies: require('./dependencies'),
    packager: {
        compiler: () => require('./compiler'),
        Css: require('./css'),
        Js: require('./js')
    }
};
