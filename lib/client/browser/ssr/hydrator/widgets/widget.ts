import type {WidgetControllerLoader} from '@beyond-js/kernel/core/ts';
import {config} from "../config";

export interface IWidgetControllerLoader {
    new(component: HTMLElement): WidgetControllerLoader;
}

export class Widget extends HTMLElement {
    #loader: WidgetControllerLoader;

    #appendStyle(bundle: string) {
        const style: HTMLLinkElement = document.createElement('link');

        const baseUrl = '/';
        style.type = 'text/css';
        style.href = `${baseUrl}${bundle}.css`;
        style.rel = 'stylesheet';
        bundle !== 'global' && style.setAttribute('bundle', bundle);
        this.shadowRoot.appendChild(style);
    }

    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        const {widgets} = require('./widgets');
        widgets.registerInstance(this);

        const {html, css} = config.widgets.get(this.localName);

        // Append global and bundle styles
        css && this.#appendStyle(css);
        this.#appendStyle('global');

        // Append the widget html
        const root = this.shadowRoot;
        const span = document.createElement('span');
        span.innerHTML = html;
        root.appendChild(span);
    }

    hydrate(WidgetControllerLoader: IWidgetControllerLoader) {
        this.#loader = new WidgetControllerLoader(this);
    }
}
