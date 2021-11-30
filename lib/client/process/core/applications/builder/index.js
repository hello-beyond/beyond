/**
 * Application builder
 *
 * @param application {object} The application to build
 */
module.exports = function (application) {
    'use strict';

    const events = new (require('events').EventEmitter);
    this.on = (event, listener) => events.on(event, listener);
    this.removeListener = (event, listener) => events.removeListener(event, listener);

    let processing;
    Object.defineProperty(this, 'processing', {get: () => !!processing});

    const builds = new (require('./builds'))(application);
    Object.defineProperty(this, 'builds', {get: () => builds.read()});
    const errors = [];
    Object.defineProperty(this, 'errors', {get: () => errors});

    this.build = async function (distribution) {
        if (typeof distribution !== 'object')
            throw new Error('Invalid distribution specifications');
        if (!['web', 'android', 'ios'].includes(distribution.platform))
            throw new Error(`Platform is not specified or is invalid: "${distribution.platform}"`);
        if (!['development', 'production'].includes(distribution.environment))
            throw new Error(`Environment "${distribution.environment}" is invalid`);

        distribution = Object.assign({build: true}, distribution);

        await application.ready;
        const name = application.name ? `"${application.name}": ` : '';
        events.emit('message', `Building application ${name}"${application.path}"`);

        processing = true;

        const processor = new (require('./processor.js'))(application, distribution, builds, events);
        try {
            await processor.process();
            processing = false;
            events.emit('finished', 'Done!');
            return {processed: true};
        }
        catch (exc) {
            processing = false;
            errors.push(exc.stack);
            console.log(`error ${exc.stack}`.red);
            events.emit('error', exc.stack);
            return {processed: false};
        }
    }
}
