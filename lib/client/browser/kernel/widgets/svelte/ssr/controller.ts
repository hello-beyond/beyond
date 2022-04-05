import {BeyondWidgetControllerSSR} from "@beyond-js/kernel/core/ts";

interface IWidgetRendered {
    errors?: string[],
    warnings?: string [],
    html?: string,
    css?: string,
    exception?: Error
}

export /*bundle*/
abstract class SvelteWidgetController extends BeyondWidgetControllerSSR {
    render(props: Record<string, any>): IWidgetRendered {
        const {Widget} = this.bundle.package().exports.values;
        if (!Widget) {
            return {errors: [`Widget "${this.element}" does not export a Widget class`]};
        }

        // Render the widget
        let html: string;
        try {
            const rendered = Widget.render(props);
            ({html} = rendered);
        } catch (exc) {
            return {errors: [exc.message]};
        }

        return {html};
    }
}
