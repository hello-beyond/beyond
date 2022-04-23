module.exports = new (class extends Map {
    #skeleton = ['path', 'files'];

    constructor() {
        super();
        this.set('scss', {skeleton: this.#skeleton});
        this.set('less', {skeleton: this.#skeleton});
        this.set('vue', {skeleton: this.#skeleton});
        this.set('svelte', {skeleton: this.#skeleton});
        this.set('default', {skeleton: this.#skeleton});
        this.set('ts', {skeleton: ['transpile', 'path', 'files']});
        // this.set('prueba', {skeleton: this.#skeleton.concat(['folder', 'otra-cosa'])});
    }
})();
