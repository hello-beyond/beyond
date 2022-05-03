module.exports = {
    name: 'page',
    extname: ['.js', '.css'],
    processors: ['less', 'scss', 'ts', 'jsx', 'js'],
    Start: require('./start'),
    Bundle: require('./bundle'),
    template: true
};
