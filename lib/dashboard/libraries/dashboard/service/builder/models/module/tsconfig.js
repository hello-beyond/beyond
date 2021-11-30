module.exports = class TsConfig extends require('./bundles/bundle') {
    _target = 'es2018';
    _module = 'es2020';
    _experimentalDecorators = true;
    _allowSyntheticDefaultImports = true;
    _moduleResolution = 'Node';
    _jsx = 'react';

    _baseUrl = './';

    _fileName = 'tsconfig.json';

    skeleton = [
        'module', 'target',
        'experimentalDecorators',
        'allowSyntheticDefaultImports',
        'moduleResolution', 'jsx'
    ];

    create() {
        const json = {};
        const properties = {};

        this.skeleton.forEach(property => {
            const key = `_${property}`;
            if (!this[key]) return;
            properties[property] = this[key];
        });
        json.compilerOptions = properties;

        this._writeJSON(this.joinPath(this.path, this._fileName), json);
    }
}