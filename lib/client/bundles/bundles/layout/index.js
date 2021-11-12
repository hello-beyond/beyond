module.exports = {
    name: 'layout',
    processors: ['less', 'scss', 'ts', 'jsx', 'js'],
    Bundle: require('./bundle'),
    Start: require('./start'),
    template: true
};
