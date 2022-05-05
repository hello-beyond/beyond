/**
 * Manager to create bundles
 */
export class ModuleBundleBuilder extends ReactiveModel {
    #bundle;
    #applicationId;

    #PROCESSORS = [
        'scss', 'less'
    ];

    #BUNDLES = [
        'page', 'widget', 'layout',
        'code', 'bridge', 'typescript',
    ];

    #TEMPLATES = Object.freeze({
        page: {
            'id': 'page',
            'bundle': 'page'
        },
        server_page: {
            'id': 'server_page',
            'bundle': 'page'
        },
        mobile_login: {
            'id': 'mobile_login',
            'bundle': 'page'
        }
    });

    get applicationId() {
        return this.#applicationId;
    }

    get PROCESSORS() {
        return this.#PROCESSORS;
    }

    get BUNDLES() {
        return this.#BUNDLES;
    }

    get type() {
        return this.#bundle.template ?? this.#bundle.type;
    }

    #origin;
    get origin() {
        return this.#origin;
    }

    set origin(value) {
        if (value === this.#origin) return;
        this.#origin = value;
        this.triggerEvent();
    }

    get bundle() {
        return this.#bundle;
    }

    constructor(applicationId) {
        super(applicationId);
        this.#applicationId = applicationId;
        this.#bundle = new ModuleBundle(this.#applicationId);
        this.#bundle.bind('change', this.triggerEvent);
    }

    setTemplate(name) {
        if (!this.#TEMPLATES.hasOwnProperty(name)) {
            console.warn('the template does not exists');
        }
        const template = this.#TEMPLATES[name];
        this.#bundle.type = template.bundle;
        this.#bundle.template = template.id;
    }

    getStructure(bundle) {
        return Structures[bundle];
    }

    setType(type) {
        this.#bundle.type = type;
    }

    cleanType() {
        this.#bundle.type = undefined;
        this.#bundle.template = undefined;
    }
}
