const {ipc} = global.utils;

/**
 * Call the declarations.update method of the Application object to generate all
 * declarations.
 * The changes of the declarations state will be notify to the client through the notify method of the application object.
 * @param {object} core Core of the client process
 */
module.exports = class {
    #model;
    #declarations = new Map();

    constructor(model) {
        this.#model = model;
    };

    packagers = require('./packagers');

    async #updateAll(application) {
        const packagers = await this.packagers(application, this.#model);

        let count = 0;
        const specs = {
            count: count,
            total: packagers.size,
            applicationId: application.item.id
        };
        ipc.notify(`declarations-save`, specs);

        for (const packager of packagers.values()) {
            ++count;
            const specs = {
                count: count,
                total: packagers.size,
                applicationId: application.item.id,
                id: packager.declaration.id
            };
            ipc.notify(`declarations-save`, specs);

            await packager.declaration.ready;
            await packager.declaration.save();
            this.#declarations.set(packager.declaration.id, packager.declaration);
        }

        ipc.notify(`declarations-save`, {
            count: count,
            total: packagers.size,
            applicationId: application.item.id
        });
    };

    async updateAll(params) {
        const {applicationId} = params;
        const application = new this.#model.Application(`application//${applicationId}`);
        await application.ready;

        if (application.error) {
            console.error(`Application "${applicationId}" not found`);
            return;
        }

        this.#updateAll(application).catch(exc => console.error(exc.stack));
    }

    async update(params) {
        const {id, applicationId} = params;

        const application = new this.#model.Application(`application//${applicationId}`);
        await application.ready;

        if (application.error) {
            console.error(`Application "${applicationId}" not found`);
            return;
        }

        if (this.#declarations.has(id)) {
            const declaration = this.#declarations.get(id);
            await declaration.ready;
            await declaration.save();
            this.#declarations.set(declaration.id, declaration);

            return;
        }

        const packagers = await this.packagers(application, this.#model);
        const packager = packagers.get(id);
        await packager.declaration.ready;
        await packager.declaration.save();
        this.#declarations.set(packager.declaration.id, packager.declaration);
    }
}