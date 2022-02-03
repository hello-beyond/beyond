module.exports = {
    name: 'start',
    extname: ['.js', '.css'],
    processors: ['less', 'scss', 'ts'],
    template: true,
    Transversal: global.Transversal,
    TransversalPackager: require('./packager'),
    TransversalJsPackager: require('./js'),
    Bundle: global.Bundle
};
