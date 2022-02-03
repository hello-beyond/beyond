module.exports = {
    name: 'sass',
    sources: {
        overwrites: true,
        extname: '.scss'
    },
    packager: {
        compiler: () => require('./compiler'),
        Css: require('./css'),
        Js: require('./js')
    }
};
