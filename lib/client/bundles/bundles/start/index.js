module.exports = {
    name: 'start',
    processors: ['less', 'scss', 'ts'],
    template: true,
    Transversal: global.Transversal,
    TransversalPackager: require('./packager'),
    TransversalCodePackager: require('./code'),
    Bundle: global.Bundle
};
