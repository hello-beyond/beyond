import type {BeyondWidget} from "../widget/widget";
import {NodeWidget} from "./node";

// To identify which element a shadow root belongs to
const shadowRoots: Map<ShadowRoot, BeyondWidget> = new Map();

// The widgets that are the roots of the tree of widgets
export const roots: Set<BeyondWidget> = new Set();

// Maintains a tree of widget instances
// NodeWidget is an object with a tree structure (parent, children)
export const instances = new class extends Map<BeyondWidget, NodeWidget> {
    /**
     * Returns the widget from its shadow root
     *
     * @param {ShadowRoot} root
     */
    getWidgetByShadowRoot(root: ShadowRoot): BeyondWidget {
        return shadowRoots.get(root);
    }

    register(widget: BeyondWidget): NodeWidget {
        if (!widget.shadowRoot) throw new Error('Shadow root is not attached');

        // Register the shadowRoot belonging to the widget that is being registered,
        // as it will be required to identify this widget as the parent of the future child widgets
        shadowRoots.set(widget.shadowRoot, widget);

        // The root node of the current widget is the shadowRoot of the parent widget
        // that should have been registered previously
        const rootNode = widget.getRootNode();

        // If the root node is the page document, the widget has no parent
        // If the root is not found, the widget is inside a non BeyondJS web component
        if (rootNode === document || !shadowRoots.has(<ShadowRoot>rootNode)) {
            const node = new NodeWidget(widget);
            this.set(widget, node);
            roots.add(widget);
            return node;
        }

        // Now the parent widget has been identified
        const parent = shadowRoots.get(<ShadowRoot>rootNode);

        const node = new NodeWidget(widget, this.get(parent));
        this.get(parent).children.add(node);

        this.set(widget, node);
        return node;
    }
}
