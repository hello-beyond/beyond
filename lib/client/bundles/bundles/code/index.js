module.exports = {
    name: 'code',
    extname: ['.js', '.css'],
    processors: ['ts', 'sass', 'js', 'jsx', 'less', 'scss'],
    Bundle: require('./bundle'),
    template: true
};
