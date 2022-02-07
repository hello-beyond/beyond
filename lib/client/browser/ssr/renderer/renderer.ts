import {beyond} from '@beyond-js/kernel/core/ts';
import {routing} from '@beyond-js/kernel/routing/ts';
import {renderWidget} from './renderWidget';
import cheerio from 'cheerio';

interface IWidgetRendered {
    html?: string,
    errors?: string[],
    css?: string
}

interface IPageRendered {
    errors?: string[],
    warnings?: string [],
    redirected?: string,
    hierarchy?: string[],
    widgets?: [string, IWidgetRendered][],
    exception?: Error
}

export /*bundle*/ const renderer = new class {
    async render(_uri: string): Promise<IPageRendered> {
        const widgets: Map<string, IWidgetRendered> = new Map();
        const hierarchy: string[] = [];

        const {page, error, redirected, uri} = await routing.page(_uri);
        if (redirected) return {redirected};
        if (error) return {errors: [error]};

        let html: string, errors: string[], css: string;

        // Render the application main layout
        const main = beyond.application.layout;
        main && hierarchy.push(main);
        ({html, errors, css} = main ? await renderWidget(main) : {html: void 0, errors: void 0, css: void 0});
        main && widgets.set(main, {html, errors, css});

        // Find child widgets
        const $ = cheerio.load(html);
        if ($('menu-layout').length) {
            // ({html, errors, css} = await renderWidget('menu-layout'));
            // widgets.set('menu-layout', {html, errors, css});
        }

        const {element, parents} = page;
        ({html, errors, css} = await renderWidget(element, {uri}));
        hierarchy.push(element);
        widgets.set(element, {html, errors, css});

        // Render the ascending layouts of the page
        void (parents); // The parents layouts of the page

        return {hierarchy, widgets: [...widgets]};
    }
}
