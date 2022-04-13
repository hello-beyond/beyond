module.exports = class extends Map {
    #children;
    #checkpoint;
    #ready;

    /**
     * DP Monitor constructor
     *
     * @param children {object} The dynamic processor children
     * @param ready {function} The function to call when the children get ready
     */
    constructor(children, ready) {
        super();
        this.#children = children;
        this.#ready = ready;
        this.#checkpoint = new (require('./checkpoint'))(children);
    }

    get items() {
        const registered = this.#children;
        const {required} = this.#children;

        const children = new Set();
        registered.forEach(({child}) => children.add(child));
        [...required.keys()].forEach(child => children.add(child));

        return children;
    }

    get pending() {
        return [...this.items].filter(child => !child.processed);
    }

    get prepared() {
        let prepared = true;
        this.items.forEach(child => prepared = prepared && child.processed);
        return prepared;
    }

    /**
     * Called when the children have changed or when a child has changed
     * @param child= {object} When the reevaluation is required by a change in a child, useful when debugging
     */
    #reevaluate = child => {
        this.prepared && require('./logs')(this.#children.dp, child);
        this.prepared && this.#ready();
    }

    /**
     * Set the child objects to initialise when not previously initialised, and to monitor for changes
     *
     * @return {boolean} Has the children collection changed?
     */
    update() {
        const registered = this.#children;
        const {required} = this.#children;

        const children = new Set();
        registered.forEach(({child}) => children.add(child));
        [...required.keys()].forEach(child => children.add(child));

        let changed = false;

        // Create the children not previously registered
        children.forEach(child => {
            if (this.has(child)) return;

            // mchild is a monitored child that reacts to the 'change' event
            const mchild = new (require('./child'))(child, this.#reevaluate);
            this.set(child, mchild);
            changed = true;
        });

        // Destroy previously registered children that is not longer used by the processor
        this.forEach(({child}) => {
            if (children.has(child)) return;

            this.get(child).destroy();
            this.delete(child);
            changed = true;
        });

        return changed;
    }

    initialise() {
        this.update();
        this.#reevaluate();
    }

    destroy() {
        this.forEach(mchild => mchild.destroy());
    }
}
