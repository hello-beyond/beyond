module.exports = new class {
    #core;
    get core() {
        return this.#core;
    }

    #http;
    get http() {
        return this.#http;
    }

    #Application;
    get Application() {
        return this.#Application;
    }

    #ApplicationLibrary;
    get ApplicationLibrary() {
        return this.#ApplicationLibrary;
    }

    #ApplicationModule;
    get ApplicationModule() {
        return this.#ApplicationModule;
    }

    #ApplicationStatic;
    get ApplicationStatic() {
        return this.#ApplicationStatic;
    }

    #Library;
    get Library() {
        return this.#Library;
    }

    #LibraryStatic;
    get LibraryStatic() {
        return this.#LibraryStatic;
    }

    #Module;
    get Module() {
        return this.#Module;
    }

    #Bundle;
    get Bundle() {
        return this.#Bundle;
    }

    #Processor;
    get Processor() {
        return this.#Processor;
    }

    #Source;
    get Source() {
        return this.#Source;
    }

    #Overwrite;
    get Overwrite() {
        return this.#Overwrite;
    }

    #Dependency;
    get Dependency() {
        return this.#Dependency;
    }

    #Compiler;
    get Compiler() {
        return this.#Compiler;
    }

    #External;
    get External() {
        return this.#External;
    }

    #TemplateOverwrite;
    get TemplateOverwrite() {
        return this.#TemplateOverwrite;
    }

    #Template;
    get Template() {
        return this.#Template;
    }

    #Collection;
    get Collection() {
        return this.#Collection;
    }

    #initialised = false;

    initialise(core, http) {
        this.#core = core;
        this.#http = http;

        if (this.#initialised) throw new Error('Model already initialised');
        this.#initialised = true;

        this.#Application = require('./application')(this);
        this.#ApplicationLibrary = require('./application/library')(this);
        this.#ApplicationModule = require('./application/module')(this);
        this.#ApplicationStatic = require('./application/static')(this);

        this.#Library = require('./library')(this);
        this.#LibraryStatic = require('./library/static')(this);

        this.#Module = require('./module')(this);
        this.#Bundle = require('./bundle')(this);
        this.#Processor = require('./processor')(this);

        this.#Source = require('./source/source')(this);
        this.#Compiler = require('./source/compiler')(this);
        this.#Overwrite = require('./source/overwrite')(this);
        this.#Dependency = require('./source/dependency')(this);

        this.#External = require('./external')(this);

        this.#Template = require('./template')(this);
        this.#TemplateOverwrite = require('./overwrite')(this);

        this.#Collection = require('./collection');
    }

    distribution(platform = 'web') {
        return {
            key: 'dashboard',
            dashboard: true,
            platform: platform
        };
    }
}