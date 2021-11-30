module.exports = class extends global.Dependency {
    // The sources that depend on this dependency
    #sources = new Map();
    get sources() {
        return this.#sources;
    }
}
