import {beyond, BeyondWidgetControllerSSR} from '@beyond-js/kernel/core/ts';
import {routing} from '@beyond-js/kernel/routing/ts';

interface IWidgetRendered {
    errors?: string[],
    warnings?: string [],
    html?: string,
    css?: string,
    exception?: Error
}

export /*bundle*/ const ssr = new class {
    async render(uri: string): Promise<IWidgetRendered> {
        const {page, error} = await routing.page(uri);
        if (error) return {errors: [error]};

        const {name} = page;
        if (!beyond.widgets.has(name)) {
            return {errors: [`Widget name "${name}" is not registered`]};
        }

        const specs = beyond.widgets.get(name);
        const bundle = await beyond.import(specs.id);

        const {Controller} = bundle;
        if (!Controller || typeof Controller !== 'function') {
            return {errors: [`Widget "${name}" does not export its Controller`]};
        }

        try {
            const controller: BeyondWidgetControllerSSR = new Controller(specs, this, bundle);
            const {html, css, errors} = controller.render();
            return {html, css, errors};
        } catch (exc) {
            return {exception: exc.stack};
        }
    }
}
