const {crc32, equal} = global.utils;
module.exports = class Distribution extends require('../file-manager') {

    skeleton = [
        "name", "platform", "environment",
        {name: "port", type: 'number'},
        {name: "inspectPort", type: 'number'},
        {name: "compress", type: 'boolean'},
        {name: "ports", type: 'object'},
        {name: "ts", type: 'boolean'},
        {name: "ssr", type: 'boolean'},
        {name: "ssr", type: 'string'},
        {name: "backend", type: 'string'},
        {name: "minify", type: 'object'},
        {name: "gzip", type: 'boolean'},
        {name: "maps", type: 'string'},
        {name: "development", type: 'object'},
        {name: "default", type: 'boolean'},
    ];

    constructor(path, specs) {
        super(path);
        this._checkProperties(specs);
    }

    get compute() {
        return crc32(equal.generate({
            platform: this.platform,
            ssr: !!this.ssr,
            server: !!this.server,
            environment: this.environment,
            compress: this.compress,
            bundles: this.bundles,
            ts: this.ts
        }));
    }

    get generate() {
        return equal.generate({
            platform: this.platform,
            ssr: !!this.ssr,
            server: !!this.server,
            environment: this.environment,
            compress: this.compress,
            bundles: this.bundles,
            ts: this.ts
        });
    }

    get state() {
        return {
            platform: this.platform,
            ssr: !!this.ssr,
            server: !!this.server,
            environment: this.environment,
            compress: this.compress,
            bundles: this.bundles,
            ts: this.ts
        }
    }
}
