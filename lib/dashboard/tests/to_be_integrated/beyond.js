define('Beyond', function () {

    it('should get the server configuration', async function () {

        const {server} = await beyond.import('/libraries/beyond-dashboard/js.js');
        const config = await server.config.fetch();
        console.log(config);

    });

    it('should get the list of applications', async function () {

        const {Applications} = await beyond.import('/libraries/beyond-dashboard/js.js');
        const applications = new Applications();
        applications.bind('change', () => console.log('applications collection changed'));
        applications.load({'items': true});

        // Load the libraries of each application
        applications.load({'items': {'libraries': {'items': {'library': true}, 'counters': {'all': true}}}});

    });

    it('should get an application', async function () {

        const {Application} = await beyond.import('/libraries/beyond-dashboard/js.js');
        const application = new Application();

    });

    it('should get the modules of an application', async function () {

        const {ApplicationModules} = await beyond.import('/libraries/beyond-dashboard/js.js');
        const modules = new ApplicationModules({'filter': {'application': 'trade-tabacalera'}});
        modules.load({'items': {'module': true}});

    });

    it('should get a module of an application', async function () {

        const {Module} = await beyond.import('/libraries/beyond-dashboard/js.js');
        const module = new Module('application//0//draft/component');
        module.load();

    });

    it('should get a list of libraries of an application', async function () {

        const {ApplicationLibraries} = await beyond.import('/libraries/beyond-dashboard/js.js');
        const libraries = new ApplicationLibraries({'filter': {'application': 'farmalivery'}});
        libraries.bind('change', () => console.log('application libraries collection changed'));
        libraries.load({'items': true});

        // Load counters
        libraries.load({'counters': {'all': true}});

    });

});

