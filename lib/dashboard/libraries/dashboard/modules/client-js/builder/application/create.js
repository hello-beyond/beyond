async function create(parent) {
    if (!parent.name) throw new Error('Name is required');

    parent.processing = true;

    try {

        const response = await module.execute('builder/project/create', parent.getters);
        if (!response?.status) {
            parent.error = response.error;
            return;
        }
        parent.created = true;
        parent.id = response.data.id;
    }
    catch (exc) {
        console.error(exc);
        parent.created = false;
    }
    finally {
        parent.processed = true;
        parent.processing = false;
    }
}
