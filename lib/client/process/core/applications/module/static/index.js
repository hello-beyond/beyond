const DynamicProcessor = global.utils.DynamicProcessor(Map);
const {FinderFile} = global.utils;

/**
 * Module static resources in the application
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.module.static';
    }

    constructor(application, module) {
        super();

        const overwrites = new (require('./overwrites'))(application, module);

        const children = new Map();
        children.set('static', {child: module.static});
        children.set('overwrites', {child: overwrites});
        super.setup(children);
    }

    _process() {
        this.length = 0;
        const finder = this.children.get('static').child;

        let o = this.children.get('overwrites').child;
        const overwrites = {
            path: o.path,
            config: o.config ? new Map(Object.entries(o.config)) : new Map()
        };

        this.clear();
        finder.forEach(file => {
            const key = file.relative.file.replace(/\\/g, '/');
            const overwrite = !overwrites.config.has(key) ? undefined :
                new FinderFile(overwrites.path,
                    require('path').join(overwrites.path, overwrites.config.get(key)));

            this.set(key, {file: file, overwrite: overwrite});
        });
    }
}
