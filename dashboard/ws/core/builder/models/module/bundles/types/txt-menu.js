/**
 * Represent the txt bundle
 *
 * The text bundle is treat as a processor for this reason extends from
 * bundle object.
 *
 * @type {module.Bundle|{}}
 */
const Bundle = require('./bundle');
module.exports = class TextMenu extends Bundle {
    _identifier = 'txt-menu';
    multilanguage = true;

    _defaultName = 'texts.json';
    skeleton = [
        'hmr', 'multilanguage', 'files'
    ];
    _name = 'txt';

    constructor(module, specs = {}) {
        super(module, 'txt-menu', specs);
    }

    async create(path) {
        const name = this._name;
        path = this.joinPath(path, name);

        if (!await this._fs.exists(path)) {
            this._fs.mkdir(path);
        }
        const tplPath = await this.templatesPath();
        const tplFile = this.joinPath(tplPath, 'processors', `${this._name}.txt`);

        // checks if the processor has default files and add to it.
        if (await this._fs.exists(tplFile)) {
            const content = await this._fs.readFile(tplFile, 'utf8');
            const dest = this.joinPath(path, this._defaultName);
            this._write(dest, content);
        }

    }

    async build(path) {
        if (this._create) this.create(path);
    }

}
