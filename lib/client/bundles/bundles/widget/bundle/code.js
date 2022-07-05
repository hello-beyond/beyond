module.exports = class extends global.BundleJsCode {
    constructor(...params) {
        super(...params);
    }

    _precode() {
        const {bundle} = this.packager;
        const {properties} = bundle;
        if (!properties.element) return;

        const specs = {
            name: properties.element.name,
            props: properties.element.props,
            id: `${bundle.resource}`
        };
        properties.is && (specs.is = properties.is);
        properties.route && (specs.route = properties.route);
        properties.layout && (specs.layout = properties.layout);

        return `require('@beyond-js/widgets/render').widgets.register([${JSON.stringify(specs)}]);\n`;
    }
}
