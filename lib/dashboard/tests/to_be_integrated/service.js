(async () => {

    const {Service} = await beyond.import('/libraries/beyond-dashboard/js.js');
    const service = new Service('application/blank');
    await service.load();

    service.bind('change', () =>
        console.log(`service status changed to "${service.status}"`)
    );

    // service.start();
    // service.stop();

})();

