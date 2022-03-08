module.exports = {
    name: 'widget',
    extname: ['.js', '.css'],
    processors: ['ts', 'sass', 'html-vue', 'svelte', 'vue', 'less', 'scss'],
    Bundle: require('./bundle'),
    Start: require('./start'),
    template: true
};
