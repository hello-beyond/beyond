module.exports = (name) => class extends global.processors.get(name).Packager {
    #hmr = new (require('./hmr'))(this);
    get hmr() {
        return this.#hmr;
    }
}
