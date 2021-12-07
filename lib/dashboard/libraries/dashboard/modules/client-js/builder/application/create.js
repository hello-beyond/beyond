async function create(parent) {
    if (!parent.name) throw new Error('Name is required');

    parent.processing = true;

    try {

        const response = await module.execute('builder/application/create', parent.getters);
        if (!response?.status) {
            parent.error = response.error;
            return;
        }
        parent.created = true;
        parent.id = response.data.id;
    }
    catch (error) {
        console.error("error", error);
        parent.created = false;
    }
    finally {
        console.log(90)
        parent.processed = true;
        parent.processing = false;
    }
}



