module.exports = class ServerApplications {

    #items = new Set;
    get items() {
        return this.#items;
    }

    #isFile;
    get isFile() {
        return this.#isFile;
    }

    #manager;
    get manager() {
        return this.#manager;
    }

    #value;
    get value() {

        return !this.isFile ? Array.from(this.items) : this.#value;
    }

    constructor(path, applications) {
        this.#value = applications;
        let data = applications;
        if (typeof applications === 'string') {
            this.#manager = new (require('../file-manager'))(require('path').join(path, applications));
            this.#manager.file.read();
            this.#isFile = true;
            data = this.manager.file.json;

        }
        data?.forEach(application => this.#items.add(application));
    }

    add = application => this.#items.add(application);
    remove = application => this.#items.delete(application);

    async save() {
        if (!this.isFile) return;
        return this.manager.file.writeJSON(this.manager.file.path, Array.from(this.items));
    }

}
