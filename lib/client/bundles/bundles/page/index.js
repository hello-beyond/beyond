module.exports = {
    name: 'page',
    processors: ['less', 'scss', 'ts', 'jsx', 'js'],
    Start: require('./start'),
    Bundle: require('./bundle'),
    template: true
};
