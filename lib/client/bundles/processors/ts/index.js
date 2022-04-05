module.exports = {
    name: 'ts',
    Hash: require('./hash'),
    options: {
        Options: require('./options'),
        file: 'tsconfig.json'
    },
    sources: {
        extname: ['.ts', '.tsx']
    },
    Analyzer: require('./analyzer'),
    Dependencies: require('./dependencies'),
    packager: {
        compiler: packager => require('./compilers').get(packager),
        declaration: packager => packager.compiler.is === 'tsc' && require('./declaration'),
        Js: require('./code')
    }
}
