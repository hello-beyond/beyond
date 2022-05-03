module.exports = class {
    #resource;
    get resource() {
        return this.#resource;
    }

    constructor(resource) {
        this.#resource = resource;
    }

    #bundle;
    get bundle() {
        if (this.#bundle !== void 0) return this.#bundle;

        const resource = this.#resource;

        // Ex: package_name/module_name/sass/bundle/file
        // The module name must not contain the string '/sass'
        if (!resource.includes('/sass/')) return {};

        const i = resource.indexOf('/sass/');
        const module = resource.slice(0, i);
        const split = resource.slice(i + 6 /* '/sass/'.length */).split('/');
        const bundle = split.shift();
        const file = `${split.join('/')}.scss`;
        const dependency = `${module}/${bundle}`;

        return this.#bundle = {dependency, file};
    }

    #external;
    get external() {
        if (this.#external !== void 0) return this.#external;

        const split = this.#resource.split('/');
        if (split[0].startsWith('@') && split.length < 2) return {};
        const pkg = split[0].startsWith('@') ? `${split.shift()}/${split.shift()}` : split.shift();

        const file = !split.length ? void 0 : `${split.join('/')}.scss`;
        return this.#external = {pkg, file};
    }
}
