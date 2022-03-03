import {beyond} from '@beyond-js/kernel/core/ts';
import {routing} from '@beyond-js/kernel/routing/ts';
import {renderWidget} from './renderWidget';
import cheerio from 'cheerio';

interface IWidgetRendered {
    html?: string,
    errors?: string[],
    css?: string,
    store: object
}

interface IPageRendered {
    errors?: string[],
    warnings?: string [],
    redirected?: string,
    hierarchy?: string[],
    widgets?: [number, IWidgetRendered][],
    exception?: Error
}

export /*bundle*/ const renderer = new class {
    async render(_uri: string): Promise<IPageRendered> {
        const widgets: Map<number, IWidgetRendered> = new Map();
        const hierarchy: string[] = [];

        const {page, error, redirected, uri} = await routing.page(_uri);
        if (redirected) return {redirected};
        if (error) return {errors: [error]};

        let html: string, errors: string[], css: string, store: object;

        // Render the application main layout
        const main = beyond.application.layout;
        ({html, errors, css, store} = main ? await renderWidget(main) : {
            html: void 0, errors: void 0, css: void 0, store: void 0
        });
        main && widgets.set(hierarchy.length, {html, errors, css, store});
        main && hierarchy.push(main);

        // Find child widgets
        const $ = cheerio.load(html);
        if ($('menu-layout').length) {
            // ({html, errors, css, store} = await renderWidget('menu-layout'));
            // widgets.set(hierarchy.length, {html, errors, css, store});
            // hierarchy.push('menu-layout');
        }

        const {element, parents} = page;
        ({html, errors, css, store} = await renderWidget(element, {uri}));
        widgets.set(hierarchy.length, {html, errors, css, store});
        hierarchy.push(element);

        // Render the ascending layouts of the page
        void (parents); // The parents layouts of the page

        return {hierarchy, widgets: [...widgets]};
    }
}
