import {widgets} from '@beyond-js/kernel/core/ts';
import type {Layout} from "../layouts/layout";

export /*bundle*/
class BeyondLayoutChildrenRenderer {
    readonly #element: HTMLElement;
    get element(): HTMLElement {
        return this.#element;
    }

    #layout: Layout;
    get layout(): Layout {
        return this.#layout;
    }

    #active: HTMLElement;
    #mounted: Map<string, HTMLElement> = new Map();

    constructor(element: HTMLElement) {
        this.#element = element;
        this.#identify();

        if (!this.#layout) return;

        if (element.shadowRoot) {
            // The shadow root is already created in ssr distributions
            this.#layout.children.forEach(child => {
                // Check which of the children were created in by ssr
                const childElement = <HTMLElement>element.shadowRoot.querySelector(child.element);
                if (!childElement) return;

                childElement.setAttribute('data-child-id', child.id);
                this.#mounted.set(child.id, childElement);
            });
        } else {
            element.attachShadow({mode: 'open'});
        }

        this.#layout.on('change', this.render);
        this.render();
    }

    // Identify the layout of the current widget
    #identify = () => this.#layout = (() => {
        const {routing} = require('../routing');

        const root = this.#element.getRootNode();
        if (root === document) return routing.manager.main;

        const widget = widgets.instances.getWidgetByShadowRoot(root as ShadowRoot);
        if (!widget) {
            throw new Error(`Widget container of beyond-layout-children not found`);
        }

        return widget.getAttribute('data-main') === '1' ?
            routing.manager.main :
            routing.manager.layouts.get(widget.getAttribute('data-child-id'));
    })();

    // Render the layouts and pages of this container
    render = () => {
        this.#layout.children.forEach(child => {
            // Create the HTMLElement of the child if it was not already created
            if (!this.#mounted.has(child.id)) {
                const element = document.createElement(child.element);
                element.setAttribute('data-child-id', child.id);
                this.#element.shadowRoot.append(element);
                this.#mounted.set(child.id, element);
            }

            const element = this.#mounted.get(child.id);
            const page: any = element;

            // The show and hide methods are defined in the page controller
            const active = this.#layout.active === child;
            if (active && element !== this.#active) {
                this.#active = element;

                const show = () => {
                    page.removeEventListener('controller.initialised', show);
                    if (!page.controller) {
                        throw new Error(`Controller of page widget "${child.element}" is undefined`);
                    }
                    this.#active === element && page.controller.show?.();
                }
                page.controller ? page.controller.show?.() : page.addEventListener('controller.initialised', show);
            } else if (!element.hidden && !active) {
                page.controller?.hide?.();
            }

            element.hidden = !active;
        });
    }
}
