module.exports = class extends Map {
    #processor;

    get waiting() {
        return new Map([...this].filter(([, {child}]) => !child.processed));
    }

    // This property exists to avoid executing the _process method in the following case.
    // There can be a situation in which two (or more) dynamic child objects are being used,
    // both are processed simultaneously, and both emit the "initialised" event.
    // In this case, both have the .processed property set to true, therefore they
    // would pass the _prepared property correctly, but immediately after the current object
    // is processed, the "initialised" event of the second object will be received,
    // processing again and without any changes in the child objects.
    #initialised = new Set();

    constructor(processor) {
        super();
        this.#processor = processor;
    }

    #objectInitialised = name => {
        this.#initialised.add(name);
        this.prepared && this.#processor._invalidate();
    };

    get prepared() {
        if (this.size !== this.#initialised.size) return false;
        return ![...this.values()].find(processor => !processor.child.processed);
    }

    #initialisedSubscriptions = new Map();

    unregister(children, invalidate = true) {
        if (!(children instanceof Array)) throw new Error('Invalid parameters');

        let changed = false;
        children.forEach(childName => {
            if (!this.has(childName)) return;
            changed = true;

            const specs = this.get(childName);
            const {child} = specs;
            child.off('initialised', this.#initialisedSubscriptions.get(child));
            child.off('change', this.#invalidate);
            child.off('processed', this.#reevaluate);

            this.#initialisedSubscriptions.delete(child);

            specs.events && specs.events.forEach(event =>
                !['initialised', 'change'].includes(event) && child.off(event, this.#invalidate));

            this.delete(childName);
        });

        invalidate && changed && this.#invalidate();
    }

    /**
     * Register children of the processor, can be additional to the previous registered children
     *
     * @param children {Map<string, object>} The children specification
     * @param invalidate {boolean} If true, invalidates the processor after the registration of the children
     * @param constructor {boolean} Some classes specializations are using private properties
     * for the this.#processor.initialised and this.#processor.initialising getters,
     * so they cannot be called if the method is invoked from the constructor of the processor
     */
    register(children, invalidate, constructor) {
        if (!children) return;
        if (!(children instanceof Map)) throw new Error('Invalid parameters');

        let changed;

        children.forEach((specs, name) => {
            if (typeof name !== 'string') throw new Error('Invalid child name specification');

            if (!specs.child) {
                throw new Error(`Child property "${name}" is undefined`);
            }
            if (typeof specs.child.on !== 'function' || typeof specs.child.initialise !== 'function') {
                throw new Error(`Child property "${name}" is not a dynamic processor`);
            }
            if (!specs.child.dp) {
                throw new Error(`Child "${name}" must have the property .dp set`);
            }

            const {child} = specs;
            if (this.has(name) && child !== this.get(name).child) {
                throw new Error(`Child "${name}" already registered with a different object`);
            }
            if (this.has(name)) return;
            changed = true;

            specs = specs ? specs : {};
            specs.events = specs.events ? specs.events : [];

            const initialisedSubscription = () => {
                this.#objectInitialised(name);
                child.off('initialised', this.#initialisedSubscriptions.get(child));
            };
            this.#initialisedSubscriptions.set(child, initialisedSubscription);

            child.initialised ? this.#initialised.add(name) : child.on('initialised', initialisedSubscription);
            child.on('change', this.#invalidate);
            child.on('processed', this.#reevaluate);

            specs.events.forEach(event => {
                if (typeof event !== 'string') throw new Error('Invalid event type, it should be string');
                if (event === 'initialised' || event === 'change') return;
                child.on(event, this.#invalidate);
            });

            this.set(name, specs);

            if (!constructor && (this.#processor.initialised || this.#processor.initialising) &&
                !child.initialised && !child.initialising) {
                child.initialise();
            }
        });

        changed && invalidate && this.#invalidate();
    }

    #invalidate = () => this.#processor._invalidate();
    // A child has been processed, but its state has not been changed (event 'change' is not emitted)
    #reevaluate = () => this.#processor.waiting && this.#processor._invalidate();

    async initialise() {
        const promises = [];
        this.forEach((specs) => {
            const {child} = specs;
            const response = child.initialised || child.initialising ? undefined : child.initialise();
            response instanceof Promise && response.catch(exc => console.log(exc.stack));
            response && !child.processed && promises.push(response);
        });
        await Promise.all(promises).catch(exc => console.log(exc.stack));
    }

    destroy() {
        this.unregister([...this.keys()]);
    }
}
