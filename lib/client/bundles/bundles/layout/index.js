module.exports = {
    name: 'layout',
    extname: ['.js', '.css'],
    processors: ['less', 'scss', 'ts', 'jsx', 'js'],
    Bundle: require('./bundle'),
    Start: require('./start'),
    template: true
};
