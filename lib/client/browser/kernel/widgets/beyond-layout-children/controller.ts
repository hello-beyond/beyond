import {beyond, BeyondWidgetController, NodeWidget} from "@beyond-js/kernel/core/ts";
import {routing, Layout} from "@beyond-js/kernel/routing/ts";

export /*bundle*/
class Controller extends BeyondWidgetController {
    #layout: Layout;
    #active: HTMLElement;
    #mounted: Map<string, HTMLElement> = new Map();

    // Render the layouts and pages of this container
    #render = () => {
        this.#layout.children.forEach(child => {
            // Create the HTMLElement of the child if it was not already created
            if (!this.#mounted.has(child.id)) {
                const element = document.createElement(child.name);
                element.setAttribute('data-id', element.id);
                this.component.shadowRoot.append(element);
                this.#mounted.set(child.id, element);
            }

            const element = this.#mounted.get(child.id);

            // Set the active child
            element.hidden = !child.active;
            child.active && (this.#active = element);
        });
    }

    mount() {
        // Find the ascending branches of parent layouts
        let iterate = this.node;

        const layoutsNodes: NodeWidget[] = [];
        while (iterate?.parent) {
            const {parent} = iterate;
            parent.is === 'layout' && layoutsNodes.unshift(parent);
            iterate = parent;
        }

        if (!layoutsNodes.length || layoutsNodes[0].widget.localName === beyond.application.layout) {
            this.#layout = routing.manager.main;
        }

        this.#layout.on('change', this.#render);
        this.#render();
    }
}
