/**
 * Call the declarations.update method of the Application object to generate all
 * declarations.
 * The changes of the declarations state will be notify to the client through the notify method of the application object.
 * @param {object} core Core of the client process
 */
module.exports = class {
    #applications;

    constructor(model) {
        this.#applications = model.core.applications;
    };

    async update(id) {
        await this.#applications.ready;
        const application = this.#applications.get(id);

        if (!application) {
            console.error(`Application "${id}" not found`);
            return;
        }

        application.declarations.update();
    };
}