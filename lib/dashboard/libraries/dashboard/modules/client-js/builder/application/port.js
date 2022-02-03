async function checkPort(base, port) {
    if (!port) throw new Error('port to check is required');

    base.processing = true;
    try {
        return module.execute('builder/project/checkPort', {port: port});
    }
    catch (error) {
        base.processing = false;
        base.processed = true;
    }
    finally {
        base.processing = false;
        base.processed = true;
    }
}
