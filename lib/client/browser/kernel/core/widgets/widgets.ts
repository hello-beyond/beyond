import {BeyondWidget} from './widget/widget';
import {instances, roots} from './instances/instances';
import {attributes} from './attributes';

export /*bundle*/
interface WidgetSpecs {
    name: string
    id: string,
    is?: string,
    route?: string,
    layout?: string
}

type WidgetsSpecs = WidgetSpecs[];

export /*bundle*/
const widgets = new class BeyondWidgets extends Map<string, WidgetSpecs> {
    get instances(): typeof instances {
        return instances;
    }

    get roots(): BeyondWidget[] {
        return [...roots];
    }

    get attributes() {
        return attributes;
    }

    register(specs: WidgetsSpecs) {
        specs.forEach((specs) => {
            const {name, id} = specs;
            if (this.has(name)) {
                console.warn(`Widget name "${name}" is registered both by "${id}" ` +
                    `and "${this.get(name).id}"`);
                return;
            }
            this.set(name, specs);

            // Do not register the custom elements when rendering in the server
            if (typeof window !== 'object') return

            // In SSR mode the custom elements required by the page are created by the hydrator
            if (customElements.get(name)) return;

            customElements.define(name, class extends BeyondWidget {
            });
        });
    }
}
