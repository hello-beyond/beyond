module.exports = {
    name: 'txt',
    sources: {
        overwrites: true,
        extname: '.json'
    },
    packager: {
        compiler: () => require('./compiler'),
        declaration: () => require('./declaration'),
        Js: require('./code')
    }
};
