class DSModel extends ReactiveModel {
    _db;
    get db() {
        return this._db;
    }

    ready() {
        return this.db.initialised;
    }

    constructor() {
        super();
        const database = new DSDatabase();
        database.initialise();
        this._db = database;
    }

    async initialise() {
        return this.db.initialise();
    }

    store = name => this.db.store(name);
}

export const Dashboard = new DSModel;