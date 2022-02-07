import {BeyondWidgetControllerBase} from "./base";

export /*bundle*/
interface IWidgetRendered {
    errors?: string[],
    warnings?: string [],
    html?: string,
    css?: string,
    exception?: Error
}

/**
 * The SSR widget react controller
 */
export /*bundle*/
abstract class BeyondWidgetControllerSSR extends BeyondWidgetControllerBase {
    abstract render(props: Record<string, any>): IWidgetRendered;
}
