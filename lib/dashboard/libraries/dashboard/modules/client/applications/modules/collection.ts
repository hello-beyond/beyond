import {Collection, CollectionSpecs} from "@beyond-js/plm/core/ts";
import {ApplicationModule} from "./item";

interface IFilters {
    container: string | undefined,
    bundle: string | undefined,
    text: string
}

export /*bundle*/
class ApplicationModules extends Collection {
    constructor(specs: CollectionSpecs) {
        super('applications-modules', ApplicationModule, specs);
        this.counters.register('all');
    }

    get elements(): ApplicationModule[] {
        if (!this.tree.landed) return [];

        const output: Array<ApplicationModule> = [];
        this.items.forEach((item: ApplicationModule) => {
            output.push(item);
        });

        return output;
    }

    /*
     * Filter the elements by container and bundle defined.
     *
     * @param filter
     * @param bundle
     * @param text
     * @returns {[]|void}
     */

    getItems({container = 'application', bundle = undefined, text = ''}: IFilters) {
        //(container: string = 'application', bundle: undefined | string = undefined, text: string = '') {
        // this function is used if a bundle container is active

        if (container === 'all' && !text) return this.elements;

        // first we check if is required all containers
        return this.elements.filter((item: ApplicationModule) => {
            //TODO validar cuando no se carga el modulo recien creado
            if (!item.landed) return;

            if (!item.id) console.warn('item sin id: ', item);

            const isApp = ['application', 'all'].includes(container) && !item.id?.includes('library');
            const isLibrary = ['library', 'all'].includes(container);
            const textSearch = item.id?.includes(text) || item?.module?.name?.includes(text);
            if (![undefined, 'all'].includes(bundle) && (isApp || isLibrary)) {
                if (item?.type.includes('widget')) {
                    const widget = item.getBundle('widget');
                    return widget.type === bundle && textSearch;
                }
                return item.type?.includes(bundle) && textSearch;
            }
            return textSearch && (isApp || isLibrary);
        });
    }
}
