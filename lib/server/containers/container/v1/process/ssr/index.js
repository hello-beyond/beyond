const {ipc} = global.utils;

module.exports = class {
    #bee;

    constructor(bee) {
        this.#bee = bee;
        ipc.handle('page/get', this.#render);
    }

    #render = async (uri) => {
        void (this);
        if (!this.#bee.valid) return {errors: ['BEE is in an invalid runtime execution state']};
        console.log(`URI "${uri}" render request on SSR IPC handler`);

        const {bundles} = this.#bee;
        await bundles.import('@beyond-js/ssr/renderer/ts');
        const bundle = bundles.get('@beyond-js/ssr/renderer/ts');
        !bundle.compiled && bundle.compile();
        if (!bundles.valid) return {errors: bundles.errors};

        try {
            const {ssr} = bundle.compiled.exports;
            return await ssr.render(uri);
        }
        catch (exc) {
            console.error(exc.stack);
            return {exception: exc.stack};
        }
    }
}
