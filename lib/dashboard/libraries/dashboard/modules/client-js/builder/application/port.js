async function checkPort(base, port) {

    if (!port) throw new Error('port to check is required');

    base.processing = true;

    try {
        const response = await module.execute('builder/project/checkPort', {port: port});
        base.processing = false;
        if (!response.valid) {
            base.triggerChange();
            return;
        }
        base.port = port;
        base.validPort = true;
        return response;
    }
    catch (error) {
        base.processing = false;
        base.validPort = false;
        base.processed = true;

    }
}

