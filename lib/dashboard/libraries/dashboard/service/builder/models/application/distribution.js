module.exports = class Distribution extends require('../file-manager') {
    _name;
    _platform;
    _environment;
    _port;
    _ssr;
    _ts;
    _compress;
    _default;

    skeleton = [
        "name", "platform", "environment", "port", "ssr", "ts", "compress", "default"
    ];

    constructor(path, specs) {
        super(path);

        this._checkProperties(specs);
    }
}