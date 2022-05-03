/**
 * Build application modules
 *
 * @param builder {object} The builder object
 * @param distribution {object} Distribution specification
 * @param path {string} The build target path
 * @param uglifier {object} The uglifier
 * @returns {Promise<void>}
 */
module.exports = class {
    // The resources being exported by the package
    #exported;
    get exported() {
        return this.#exported;
    }

    #externals;
    get externals() {
        return this.#externals;
    }

    async process(builder, distribution, path, uglifier) {
        const exports = this.#exported = new Map();
        // const externals = this.#externals = new Set();
        const externals = this.#externals = {
            all: new Set(),
            client: new Set()
        };

        const bridges = distribution.platform === 'backend' ? new (require('./bridges'))(path) : void 0;

        builder.emit('message', 'Building application modules');

        const {platform} = distribution;
        const {application} = builder;
        await application.modules.ready;

        let staticItems;
        for (const module of await application.modules.values()) {
            await module.ready;
            if (module.container.package === '@beyond-js/local') continue;
            if (!module.platforms.has(platform)) continue;

            builder.emit('message', `. Building module "${module.pathname}"`);
            bridges && await bridges.process(module, distribution, builder);
            await require('./bundles')(builder, module, distribution, path, uglifier, exports, externals);
            const items = await require('./statics')(builder, module, path);
            staticItems = !staticItems ? items : Array.from(staticItems).concat(Array.from(items));
        }

        // Save the bridges information
        await bridges?.save();

        return staticItems;
    }
}