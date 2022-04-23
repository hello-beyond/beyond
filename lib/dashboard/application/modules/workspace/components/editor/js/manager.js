/**
 * Map of editor's manager created.
 *
 * Each project has an EditorManager
 * @type {Map<any, any>}
 */
const managers = new Map();

/**
 * Manages the editor instances created by the panels
 *
 * Each panel has it's own editor
 *
 */
class Manager extends ReactiveModel {

    /**
     * Map of available sources.
     *
     * The sources could be a entire module or a file.
     * @type {Map<any, any>}
     * @private
     */
    #sources = new Map();
    get sources() {
        return this.#sources;
    }

    #instanceId;
    #items = new Map();
    /**
     * Represent the list of editor instances
     * @returns {Map<unknown, unknown>}
     */
    get items() {
        return this.#items;
    }

    #favorites = new Map();
    get favorites() {
        return this.#favorites;
    }

    #project
    get project() {
        return this.#project;
    }

    get monaco() {
        return monacoDependency.monaco;
    }

    constructor(project) {
        super();
        this.#instanceId = performance.now();
        this.#project = project;

    }

    #dependencies = new Map();

    get(id) {
        return this.items.get(id);
    }

    /**
     * Creates a new Monaco Editor
     * @param specs
     * @returns {*}
     */
    create = specs => {
        if (this.items.has(specs.id)) return this.items.get(specs.id);
        const editor = new Editor(specs);
        this.items.set(specs.id, editor);
        if (!!this.#dependencies.size) {
            this.#processEditorModels(editor);
        }
        return editor;
    }

    /**
     * Loads the sources of the module in all editor instances.
     *
     */
    setModuleManager(module) {

        module?.bundles?.items.forEach(bundle => {
            const process = () => {
                if (bundle.dependencies.ready) return;

                bundle.dependencies.items.forEach(dependency => {
                    if (dependency.external) {
                        return console.warn(`external dependency: ${dependency.id}`);
                    }
                    this.#dependencies.set(dependency.id, dependency);
                });
                this.#processSources();
            };
            if (!bundle.dependencies.ready) {
                bundle.dependencies.bind('change', process);
                return;
            }
            process();

        });

    }

    #processSources() {
        this.items.forEach(editor => this.#processEditorModels(editor));
    }

    /**
     * Creates the models of the module
     * @param editor
     * @private
     */
    #processEditorModels(editor) {
        this.#dependencies.forEach(dependency => {
            editor.setDependency(dependency.declaration.code, dependency.resource);
        })

    }

}

export function getEditorManager(project) {
    if (!project || !project.id) {
        console.error("cannot access to an undefined project");
        return;
    }
    if (managers.has(project.id)) return managers.get(project.id);

    let editorManager = new Manager(project);
    managers.set(project.id, editorManager);
    return editorManager;
}



