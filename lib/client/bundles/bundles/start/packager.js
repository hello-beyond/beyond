module.exports = class extends global.TransversalPackager {
    constructor(...params) {
        super(...params);

        const {dependencies} = this;
        dependencies.add('@beyond-js/kernel/core/ts');

        const {platform} = this.distribution;
        ['web', 'android', 'ios', 'ssr'].includes(platform) && dependencies.add('@beyond-js/kernel/routing/ts');
    }
}
