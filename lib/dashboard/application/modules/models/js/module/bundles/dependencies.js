class DependenciesManager extends ReactiveModel {

    #ready;
    get ready() {
        return this.#ready;
    }

    #model;
    get model() {
        return this.#model;
    }

    loadDependencies(processorId) {
        const specs = {
            tree: {
                properties: {
                    bundle: true,
                    declaration: true
                }
            },
            filter: [{
                field: 'processor',
                operand: 0,
                value: processorId
            }]
        };
        const model = new ProcessorDependencies(specs);
        model.bind('change', this.#check);
        model.fetch();
        this.#model = model;
    }

    #check = () => {
        if (!this.model.landed) return;
        if (this.model.landed) {
            const branch = this.tree.items.get(this.bundle.name);
            branch.addDependencies(this.model);
            this.triggerEvent();
        }
        if (this.model.tree.landed) {
            this.#ready = true;
            this.model.unbind('change', this.#check);
            this.triggerEvent('dependencies.loaded');
        }

    }

}

