const DynamicProcessor = global.utils.DynamicProcessor(Map);
const AppBundles = require('./application');

module.exports = new class extends DynamicProcessor {
    get dp() {
        return 'dependencies.seeker.app-bundles';
    }

    #consumers = new Map();

    obtain(seeker) {
        const {application} = seeker;
        const registered = this.#consumers.has(application.path) ?
            this.#consumers.get(application.path) : {seekers: new Set()};

        !registered.appBundles && (registered.appBundles = new AppBundles(application));
        registered.seekers.add(seeker);

        this.#consumers.set(application.path, registered);
        return registered.appBundles;
    }

    release(seeker) {
        const {application} = seeker;
        const registered = this.#consumers.get(application.path);
        if (!registered) {
            console.error('There are no application bundles object instantiated');
            return;
        }

        if (!registered.seekers.has(seeker)) {
            console.error('Seeker not registered');
            return;
        }

        registered.seekers.delete(seeker);
        if (registered.seekers.size) return;

        const {appBundles} = registered;
        this.#consumers.delete(application.path);
        appBundles.destroy();
    }
}
