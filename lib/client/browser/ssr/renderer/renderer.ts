import {beyond} from '@beyond-js/kernel/core/ts';
import {PageReactWidgetController} from '@beyond-js/kernel/react-widget/ts';
import {routing} from '@beyond-js/kernel/routing/ts';

interface IWidgetRendered {
    errors?: string[],
    warnings?: string [],
    redirected?: string,
    html?: string,
    css?: string,
    exception?: Error
}

export /*bundle*/ const renderer = new class {
    async render(_uri: string): Promise<IWidgetRendered> {
        const {page, error, redirected, uri} = await routing.page(_uri);
        if (redirected) return {redirected};
        if (error) return {errors: [error]};

        const {element} = page;
        if (!beyond.widgets.has(element)) {
            return {errors: [`Widget element "${element}" is not registered`]};
        }

        const specs = beyond.widgets.get(element);
        const bundle = await beyond.import(specs.id);

        const {Controller} = bundle;
        if (!Controller || typeof Controller !== 'function') {
            return {errors: [`Widget "${element}" does not export its Controller`]};
        }

        try {
            const controller: PageReactWidgetController = new Controller(specs, uri);
            const {html, errors} = controller.render();
            return {html, errors};
        } catch (exc) {
            return {exception: exc.stack};
        }
    }
}
