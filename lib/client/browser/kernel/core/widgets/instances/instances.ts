import type {BeyondWidget} from "../widget";
import {NodeWidget} from "./node";

// To identify which element a shadow root belongs to
const roots: Map<ShadowRoot, BeyondWidget> = new Map();

export const instances = new class extends Map<BeyondWidget, NodeWidget> {
    register(widget: BeyondWidget): NodeWidget {
        if (!widget.shadowRoot) throw new Error('Shadow root is not attached');

        const root = widget.getRootNode();
        roots.set(widget.shadowRoot, widget);
        if (root === document) {
            this.set(widget, new NodeWidget(widget));
            return;
        }

        if (!roots.has(<ShadowRoot>root)) return;
        const parent = roots.get(<ShadowRoot>root);

        const node = new NodeWidget(widget, this.get(parent));
        this.get(parent).children.add(node);

        this.set(widget, node);
        return node;
    }
}
