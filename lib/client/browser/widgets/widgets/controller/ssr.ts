import {WidgetControllerBase} from "./controller";
import {DependenciesStyles} from '@beyond-js/kernel/styles';
import type {IWidgetSpecs} from '@beyond-js/widgets/render';

export /*bundle*/
interface IWidgetRendered {
    html?: string,
    css?: string,
    errors?: string[],
    warnings?: string[],
    store?: object,
    attributes?: [string, string][]
}

/**
 * The SSR widget react controller
 */
export /*bundle*/
abstract class WidgetServerController extends WidgetControllerBase {
    readonly #styles: string[] = [];
    get styles() {
        return this.#styles;
    }

    protected constructor(params: { specs?: IWidgetSpecs, widget?: HTMLElement }) {
        super(params);
        const styles = new DependenciesStyles(this.specs.id);
        styles.elements.forEach(({href}) => this.#styles.push(href));

        this.#styles.unshift(`##_!baseUrl!_##/global.css`);
    }

    abstract render(props: Record<string, any>): Promise<IWidgetRendered> | IWidgetRendered;
}
