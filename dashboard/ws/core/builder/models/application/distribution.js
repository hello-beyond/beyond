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
        "name", "platform", "environment",
        {name: "port", type: 'number'},
        {name: "ssr", type: 'boolean'},
        {name: "ts", type: 'boolean'},
        {name: "compress", type: 'boolean'},
        {name: "default", type: 'boolean'},

    ];

    constructor(path, specs) {
        super(path);

        this._checkProperties(specs);
    }
}
