import {BeyondWidget} from "./widget";

export interface WidgetSpecs {
    name: string
    id: string,
    is?: string,
    route?: string,
    layout?: string
}

type WidgetsSpecs = WidgetSpecs[];

export /*bundle*/
const widgets = new class BeyondWidgets extends Map<string, WidgetSpecs> {
    register(specs: WidgetsSpecs) {
        specs.forEach((specs) => {
            const {name, id} = specs;
            if (this.has(name)) {
                console.warn(`Widget name "${name}" is registered both by "${id}" ` +
                    `and "${this.get(name).id}"`);
                return;
            }
            this.set(name, specs);

            'customElements' in globalThis && customElements.define(name, class extends BeyondWidget {
                constructor() {
                    super(specs);
                }
            });
        });
    }
}
