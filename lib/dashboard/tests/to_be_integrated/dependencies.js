(async () => {

    const {Module} = await beyond.import('/libraries/beyond-dashboard/js.js');
    const module = new Module('application//0//home');

    module.dependencies.update();

})();
