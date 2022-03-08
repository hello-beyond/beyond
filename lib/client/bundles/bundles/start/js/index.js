module.exports = class extends global.TransversalCodePackager {
    /**
     * Start transversal code packager constructor
     *
     * @param tp {object} The transversal packager
     * @param params
     */
    constructor(tp, ...params) {
        super(tp, ...params);
        const {distribution} = tp;
        const {application} = tp.transversal;

        super.setup(new Map([
            ['bundles', {child: new (require('./bundles'))(application, distribution)}]
        ]));
    }

    _generate() {
        const {sourcemap: input} = super._generate();
        if (input.errors) return input;

        const bundles = this.children.get('bundles').child;
        const {transversal, distribution} = this.tp;
        const {application} = transversal;

        const sourcemap = new (require('./sourcemap'))();

        // The bundles start code
        bundles.code && sourcemap.concat(bundles.code);

        // The code of the bundles of the libraries and modules
        sourcemap.concat(input.code, input.map);

        const {platform} = distribution;
        const {platforms} = global;

        if (platforms.webAndMobileAndSSR.includes(platform)) {
            // Initialise routing
            let routingMode = application.routing === 'hash' ? 0 : 1;
            routingMode = platforms.mobile.includes(platform) ? 0 : routingMode;
            routingMode = platforms.ssr === platform ? 1 : routingMode;
            const routingModeComment = `/*routing mode is by "${routingMode === 0 ? 'hash' : 'pathname'}"*/`;
            sourcemap.concat(`routing.setUp(${routingModeComment}${routingMode});\n\n`);
        }

        return {sourcemap};
    }

    _post(input) {
        const {distribution} = this.tp;
        const {platforms} = global;
        const {platform} = distribution;

        if (platforms.node.includes(platform)) return input;
        if (distribution.bundles.mode !== 'amd') return input;

        const baseUrl = platforms.web.includes(platform) ? '/packages' : 'packages';
        const code = (`requirejs.config({baseUrl: '${baseUrl}'});\n\n`);

        const sourcemap = new (require('./sourcemap'))();
        sourcemap.concat(code);
        sourcemap.concat(input.code, input.map);
        return sourcemap;
    }
}
