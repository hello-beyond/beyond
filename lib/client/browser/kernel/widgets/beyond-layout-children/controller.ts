import {beyond, BeyondWidgetController, NodeWidget} from "@beyond-js/kernel/core/ts";
import {routing, Layout} from "@beyond-js/kernel/routing/ts";

export /*bundle*/
class Controller extends BeyondWidgetController {
    #layout: Layout;
    #active: HTMLElement;
    #mounted: Map<string, HTMLElement> = new Map();

    // Identify the layout of the current widget
    #identify = () => {
        // Construct the ascending layouts of the current widget
        let iterate = this.node;
        const layouts: NodeWidget[] = [];
        while (iterate?.parent) {
            const {parent} = iterate;
            parent.is === 'layout' && layouts.unshift(parent);
            iterate = parent;
        }

        if (!layouts.length || layouts[0].widget.localName === beyond.application.layout) {
            this.#layout = routing.manager.main;
        }
    }

    // Render the layouts and pages of this container
    render = () => this.#layout.children.forEach(child => {
        // Create the HTMLElement of the child if it was not already created
        if (!this.#mounted.has(child.id)) {
            const element = document.createElement(child.element);
            element.setAttribute('data-child-id', child.id);
            this.component.shadowRoot.append(element);
            this.#mounted.set(child.id, element);
        }

        const element = this.#mounted.get(child.id);
        const page: any = element;

        // The show and hide methods are defined in the page controller
        if (child.active && element !== this.#active) {
            this.#active = element;

            const show = () => {
                page.removeEventListener('bundle.loaded', show);
                this.#active === element && page.controller.show?.();
            }
            page.controller ? page.controller.show?.() : page.addEventListener('bundle.loaded', show);
        } else if (!element.hidden && !child.active) {
            page.controller?.hide?.();
        }

        element.hidden = !child.active;
    });

    #initialised = false;

    initialise() {
        if (this.#initialised) throw new Error('Already initialised');
        this.#initialised = true;

        this.#identify();

        this.#layout.on('change', this.render);
        this.render();
    }
}
