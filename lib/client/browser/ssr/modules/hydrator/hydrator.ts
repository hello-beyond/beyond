import type {IWidgetControllerLoader} from "./widgets/widget";
import type {BeyondLayoutChildrenRenderer} from '@beyond-js/kernel/routing/ts';
import './widgets/widgets';
import {config} from './config';
import {widgets} from "./widgets/widgets";

class Hydrator {
    getCachedStore(id: number): object {
        return config.widgets.get(id)?.store;
    }

    /* Give up the power of the widgets to the controllers */
    hydrate(WidgetControllerLoader: IWidgetControllerLoader, BeyondLayoutChildrenRenderer: BeyondLayoutChildrenRenderer) {
        widgets.hydrate(WidgetControllerLoader, BeyondLayoutChildrenRenderer);
    }
}

const hydrator = new Hydrator();
(window as any).__beyond_hydrator = hydrator;

window.onload = () => {
    // Append the main layout
    const main = config.main ? config.main : 'beyond-layout-children';
    const el = document.createElement(main);
    el.setAttribute('data-main', '1');
    document.body.append(el);
};
