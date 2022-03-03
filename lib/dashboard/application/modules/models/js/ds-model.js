class DSModelObject extends ReactiveModel {
    _db;
    get db() {
        return this._db;
    }

    ready() {
        return this.db.initialised;
    }

    #initialising;

    #wd;
    get wd() {
        return this.#wd;
    }

    #lastAccess;
    get lastAccess() {
        return this.#lastAccess;
    }

    constructor() {
        super();
        const database = new DSDatabase();
        database.initialise();
        this._db = database;
    }

    async initialise(wd) {
        if (this.#initialising) return this.#initialising;
        this.#initialising = this.db.initialise();
        await this.#initialising;
        this.#lastAccess = performance.now();
        const data = await DSModel.db.store('workspace').get(wd);
        if (!data) return this.reset(wd);

        return this.db.store('workspaces').save({wd, lastAccess: this.#lastAccess});
    }

    async reset(wd) {
        const specs = {
            wd,
            lastAccess: performance.now(),
            panels: {items: new Map()},
            opened: new Set()
        };
        await this.db.store('workspace').save(specs);
        return specs;
    }

    store = name => this.db.store(name);
}

export const DSModel = new DSModelObject;
