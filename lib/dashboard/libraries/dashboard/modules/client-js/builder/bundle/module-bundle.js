/**
 * Manager to create bundles
 */
export class ModuleBundleBuilder extends ReactiveModel {
    _bundle;
    _applicationId;

    _PROCESSORS = [
        'scss', 'less'
    ];

    _BUNDLES = [
        'page', 'widget', 'layout',
        'code', 'bridge', 'typescript',
    ];

    _TEMPLATES = Object.freeze({
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
        return this._applicationId;
    }

    get PROCESSORS() {
        return this._PROCESSORS;
    }

    get BUNDLES() {
        return this._BUNDLES;
    }

    get type() {
        return this._bundle.template ?? this._bundle.type;
    }

    _origin;
    get origin() {
        return this._origin;
    }

    set origin(value) {
        if (value === this._origin) return;
        this._origin = value;
        this.triggerEvent();
    }
    get bundle() {
        return this._bundle;
    }

    constructor(applicationId) {
        super(applicationId);
        this._applicationId = applicationId;
        this._bundle = new ModuleBundle(this._applicationId);
        this._bundle.bind('change', this.triggerEvent);
    }

    setTemplate(name) {
        if (!this._TEMPLATES.hasOwnProperty(name)) {
            console.warn('the template does not exists');
        }
        const template = this._TEMPLATES[name];
        this._bundle.type = template.bundle;
        this._bundle.template = template.id;
    }

    getStructure(bundle) {
        return Structures[bundle];
    }

    setType(type) {
        this._bundle.type = type;
    }

    cleanType() {
        this._bundle.type = undefined;
        this._bundle.template = undefined;
    }
}
