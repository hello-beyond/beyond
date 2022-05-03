import type {WidgetControllerLoader} from '@beyond-js/kernel/core/ts';
import {config} from "../config";

export interface IWidgetControllerLoader {
    new(component: HTMLElement): WidgetControllerLoader;
}

export class Widget extends HTMLElement {
    #id: number;
    #loader: WidgetControllerLoader;
    #connected = false;

    #appendStyle(bundle: string) {
        const style: HTMLLinkElement = document.createElement('link');

        const baseUrl = '/';
        style.type = 'text/css';
        style.href = `${baseUrl}${bundle}.css`;
        style.rel = 'stylesheet';
        bundle !== 'global' && style.setAttribute('bundle', bundle);
        this.shadowRoot.appendChild(style);
    }

    constructor(id: number) {
        super();
        this.#id = id;

        this.attachShadow({mode: 'open'});

        const {widgets} = require('./widgets');
        widgets.registerInstance(this);

        const {html, css} = config.widgets.get(id);

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
        this.#connected && this.#loader.connectedCallback();
    }

    connectedCallback() {
        const id = this.#id;
        this.setAttribute('ssr-widget-id', id.toString());
        this.#connected = true;
        this.#loader?.connectedCallback();
    }
}
