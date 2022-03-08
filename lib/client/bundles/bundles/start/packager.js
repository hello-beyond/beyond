module.exports = class extends global.TransversalPackager {
    constructor(...params) {
        super(...params);

        const {dependencies} = this;
        dependencies.add('@beyond-js/kernel/core/ts');

        const {platforms} = global;
        const {platform} = this.distribution;
        platforms.webAndMobileAndSSR.includes(platform) && dependencies.add('@beyond-js/kernel/routing/ts');
    }
}
