const {crc32, equal} = global.utils;
module.exports = class Distribution extends require('../file-manager') {

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
