function CreateApplication(parent, base) {
    'use strict';

    async function create() {
        if (!parent.name) throw new Error('Name is required');

        base.processing = true;
        base.processed = false;
        base.triggerChange();

        try {

            const response = await module.execute('builder/application/create', parent.getters);
            if (!response?.status) {
                base.error = response.error;
                return;
            }

            base.created = true;
            base.id = response.data.id;
        }
        catch (error) {
            console.error("error", error);
            base.created = false;
        }
        finally {
            base.processed = true;
            base.processing = false;
            base.triggerChange();
        }
    }

    parent.create = create;
}
