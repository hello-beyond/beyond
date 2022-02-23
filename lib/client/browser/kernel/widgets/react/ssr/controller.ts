import * as ReactDOMServer from 'react-dom/server.js';
import * as React from 'react';
import {BeyondWidgetControllerSSR} from "@beyond-js/kernel/core/ts";

interface IWidgetRendered {
    errors?: string[],
    warnings?: string [],
    html?: string,
    css?: string,
    exception?: Error
}

export /*bundle*/
class ReactWidgetController extends BeyondWidgetControllerSSR {
    render(): IWidgetRendered {
        const {Widget} = this.bundle.package().exports.values;
        if (!Widget) {
            return {errors: [`Widget "${this.element}" does not export a Widget class`]};
        }

        // Render the widget
        const html = ReactDOMServer.renderToString(React.createElement(Widget));
        return {html};
    }
}
