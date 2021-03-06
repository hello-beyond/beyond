const {fs} = global.utils;
const uglifier = new (require('./uglifier'));

module.exports = class {
    #builder;
    #distribution;
    #paths;
    get paths() {
        return this.#paths;
    }

    constructor(builder, distribution) {
        this.#builder = builder;
        this.#distribution = distribution;

        const p = require('path');
        const paths = this.#paths = {};
        paths.builds = p.join(builder.application.path, '.beyond/builds');
        paths.base = p.join(paths.builds, distribution.name);
        paths.build = p.join(paths.base, 'code');
        paths.www = p.join(paths.build, ['android', 'ios'].includes(distribution.platform) ? 'www' : '');
        paths.archive = p.join(paths.base, 'build.zip');
    }

    async process() {
        const builder = this.#builder;
        const {builds} = builder;
        const distribution = this.#distribution;
        const {platform} = distribution;
        const {platforms} = global;
        const paths = this.#paths;

        if (await fs.exists(paths.base)) {
            builder.emit('message', `A previous build was found on "${paths.base}"`);
            builder.emit('message', 'Removing all content of the previous build');
            await fs.promises.rmdir(paths.base, {recursive: true});
            builder.emit('message', 'Previous build removed');
        }
        else {
            builder.emit('message', `Build is being processed on "${paths.base}"`);
        }
        if (await fs.exists(paths.base)) {
            throw new Error(`Directory "${paths.base}" must be empty before building application`);
        }

        // Append the build data to the builds storage
        await builds.append(paths, distribution);

        // Create the target directory
        await fs.mkdir(paths.build, {'recursive': true});

        // Build platform specific resources, as icons, splash screen images and configuration files (config.xml)
        // await (require('./resources'))(builder, distribution, paths.build);

        // build index.html, config.js and start.js files
        await (require('./start'))(builder, distribution, paths.www, uglifier);

        // Copy static resources
        const staticEntries = {};
        staticEntries.project = await (require('./statics'))(builder, distribution, paths.www);

        // Copy libraries statics resources
        await (require('./libraries'))(builder, distribution, paths.www);

        // Build modules
        const modules = new (require('./modules'));
        staticEntries.modules = await modules.process(builder, distribution, paths.www, uglifier);

        // Copy externals resources (node dependencies resources)
        const externals = await require('./externals')(builder, modules, distribution, paths);

        // Save the package.json
        if (distribution.npm || platforms.node.includes(platform)) {
            await (require('./packages'))(modules, builder, paths, staticEntries, externals, distribution);
        }

        // Create the .zip file
        await require('./archive.js')(builder, paths.build, paths.archive);

        // Append the build data to the builds storage
        await builds.append(paths, distribution, true);

        builder.emit('message', `Build is done on "${paths.base}"`);
    }
}