import type {prerender as p} from '@beyond-js/widgets/render';
import type {ssr as s} from '@beyond-js/widgets/layout';

declare const amd_require: any;

const config = (<any>globalThis).__beyond_config;
const {application} = config;

function createLayout() {
    const {layout} = application;
    const element = document.createElement(layout ? layout : 'beyond-layout-children');
    document.body.append(element);
}

function startup() {
    const dependencies = [
        '@beyond-js/kernel/core',
        '@beyond-js/kernel/routing',
        '@beyond-js/widgets/routing',
        '@beyond-js/widgets/layout'
    ];
    dependencies.push(`${application.package}/start`);

    amd_require(dependencies, createLayout);
}

(() => {
    if (!config.ssr || !application.routing?.ssr) {
        startup();
        return;
    }

    (<any>window).__ssr_fetch.then((ssr: any) => {
        if (!ssr.json || ssr.json.errors?.length) {
            console.error('Error getting ssr data:', ssr.json.errors);
            startup();
            return;
        }

        const dependencies = ['@beyond-js/widgets/render', '@beyond-js/widgets/layout'];
        dependencies.push(`${application.package}/start`);

        amd_require(dependencies, (render: any, layout: any) => {
            // Register the widgets
            const specs = new Map(ssr.json.widgets.specs);
            render.widgets.register([...specs.values()]);

            // Register the ssr widgets
            const instances = ssr.json.widgets.instances;
            const prerender: typeof p = render.prerender;
            instances.forEach((instance: any) => prerender.ssr.push(instance));

            // Register the ssr page and layout structure
            const lssr: typeof s = layout.ssr;
            lssr.data(ssr.json.main, ssr.json.page);
            createLayout();
        });
    });
})();
