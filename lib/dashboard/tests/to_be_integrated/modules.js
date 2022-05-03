(async () => {

    const {Module} = await beyond.import('/libraries/beyond-dashboard/js.js');
    const module = new Module('application//blank//home');

    await module.load();

    const bundles = module.bundles.items;
    const bundle = bundles[0];
    await bundle.load();
    const processor = bundle.processors.items[0];
    await processor.load();

})();
