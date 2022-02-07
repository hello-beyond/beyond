import type {BeyondWidget} from "../widget/widget";

export /*bundle*/
class NodeWidget {
    readonly #widget: BeyondWidget;
    get widget() {
        return this.#widget;
    }

    get is() {
        return this.#widget.is;
    }

    get route(): string {
        return this.#widget.route;
    }

    get layout(): string {
        return this.#widget.layout;
    }

    readonly #parent: NodeWidget;
    get parent() {
        return this.#parent;
    }

    readonly #children: Set<NodeWidget>;
    get children() {
        return this.#children;
    }

    constructor(widget: BeyondWidget, parent?: NodeWidget) {
        this.#widget = widget;
        this.#parent = parent;
        this.#children = new Set();
    }
}
