function ApplicationPort(parent, base) {
    'use strict';

    async function check(port) {

        if (!port) throw new Error('port to check is required');

        base.processing = true;
        base.processed = false;
        base.triggerChange();

        try {
            const response = await module.execute('builder/application/checkPort', {port: port});
            base.processing = false;
            if (!response.valid) {
                base.triggerChange();
                return;
            }
            base.port = port;
            base.validPort = true;
            base.triggerChange();
            return response;
        }
        catch (error) {
            base.processing = false;
            base.validPort = false;
            base.processed = true;
            base.triggerChange();
        }
    }

    parent.checkPort = check;
}
