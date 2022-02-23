import type {WidgetSpecs} from "@beyond-js/kernel/core/ts";
import type {URI} from '@beyond-js/kernel/routing/ts';
import {ReactWidgetController} from "./controller";
import * as ReactDOMServer from "react-dom/server";
import * as React from "react";

export /*bundle*/
class PageReactWidgetController extends ReactWidgetController {
    readonly #uri: URI;

    constructor(specs: WidgetSpecs, uri: URI) {
        super(specs);
        this.#uri = uri;
    }

    render() {
        const {Widget} = this.bundle.package().exports.values;
        if (!Widget) {
            return {errors: [`Widget "${this.element}" does not export a Widget class`]};
        }

        // Render the widget
        const html = ReactDOMServer.renderToString(React.createElement(Widget, {
            uri: this.#uri
        }));
        return {html};
    }
}
