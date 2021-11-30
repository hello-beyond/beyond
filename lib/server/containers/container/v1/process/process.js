require('./global');

new class {
    #specs;
    #bee;
    #ssr;
    #initialised = false;

    async initialise() {
        if (this.#initialised) throw new Error('Bee process already initialised');

        const {is, container} = this.#specs;
        this.#bee = new (require('./bee'))(is, container);

        this.#ssr = is === 'ssr' ? new (require('./ssr'))(this.#bee) : void 0;

        process.send({type: 'initialised'});
    }

    close() {
        process.exit();
    }

    constructor() {
        try {
            this.#specs = JSON.parse(process.argv[2]);
            Object.defineProperty(global, '__beeSpecs', {get: () => this.#specs});
        }
        catch (exc) {
            console.error('Error parsing backend service configuration', exc.stack);
            this.close();
            return;
        }

        const {container} = this.#specs;
        const {name} = `${container.is}/${container.id}`;
        process.title = `BeyondJS Execution Environment: "${name}"`;

        process.on('message', message => {
            if (typeof message !== 'object') return;

            let response;
            switch (message.type) {
                case 'close':
                    response = this.close();
                    response instanceof Promise && response.catch(exc =>
                        console.error(`Error closing "${name}" backend service`, exc.stack)
                    );
                    break;
            }
        });

        this.initialise().catch(exc => console.log(exc.stack));
    }
}
