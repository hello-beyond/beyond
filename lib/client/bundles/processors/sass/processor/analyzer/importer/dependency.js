/**
 * A dependency of a sass processor is a files collection of another processor of another bundle
 */
module.exports = class {
    #application;
    #bundle;
    get bundle() {
        return this.#bundle;
    }

    #error;
    get error() {
        return this.#error
    }

    #files;
    get files() {
        return this.#files;
    }

    constructor(application, bundle) {
        this.#application = application;
        this.#bundle = bundle;
    }

    async process() {
        const application = this.#application;
        const split = this.#bundle.split('/');
        const bname = split.pop();
        const mresource = split.join('/');

        await application.modules.ready;
        if (!application.modules.resources.ids.has(mresource)) {
            this.#error = `Module "${mresource}" not found`;
            return;
        }

        const module = application.modules.resources.ids.get(mresource);
        await module.ready;

        if (!module.bundles.has(bname)) {
            this.#error = `Bundle "${bname}" not found on module "${mresource}"`;
            return;
        }

        const bundle = module.bundles.get(bname);
        await bundle.ready;
        const bpackager = bundle.packagers.get({key: 'internal:sass'});
        await bpackager.processors.ready;

        if (!bpackager.processors.has('sass')) {
            this.#error = `Bundle "${bname}" on module "${mresource}" does not implement a "sass" processor`;
            return;
        }
        const processor = bpackager.processors.get('sass');
        await processor.files.ready;

        this.#files = processor.files;
    }
}
