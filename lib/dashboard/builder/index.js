require('colors');

class Builder {
    constructor() {
        require('../../global');

        // Start the files watchers main process
        require('../../watchers/main');

        // Start the helper to share data used both by client and server
        require('../../data')(8080);
    }

    build = async () => {
        console.log('Building application...'.blue);
        const application = new (require('./application'))();
        await application.build();
        console.log('Application build is done!'.blue);

        console.log('');
        console.log('Building service...'.blue);
        const service = new (require('./service'))();
        await service.build();
        console.log('Service build is done!'.blue);
    }
}

(async () => {
    const builder = new Builder();
    await builder.build();
})().catch(exc => console.log(exc.stack));
