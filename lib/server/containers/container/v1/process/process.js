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
        const bimport = module => import(module);
        Object.defineProperty(global, 'brequire', {get: () => require});
        Object.defineProperty(global, 'bimport', {get: () => bimport});

        let specs;
        try {
            this.#specs = specs = JSON.parse(process.argv[2]);
            Object.defineProperty(global, '__beeSpecs', {get: () => specs});
        }
        catch (exc) {
            console.error('Error parsing BEE specification', exc.stack);
            this.close();
            return;
        }

        const {container} = specs;
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
