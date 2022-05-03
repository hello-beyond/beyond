module.exports = function (service) {
    const actions = new (require('./actions'));

    this.build = require('./build');
    this.server = new (require('./server'));
    this.bees = new (require('./bees'))(actions);
    this.builder = new (require('./builder'))(service);
    this.sources = new (require('./sources'))(service);
    this.bundles = new (require('./bundles'))(actions);
    this.modules = new (require('./modules'))(actions);
    this.dashboard = new (require('./dashboard'))(service);
    this.templates = new (require('./templates'))(actions);
    this.libraries = new (require('./libraries'))(actions);
    this.transversal = new (require('./transversal'))(actions);
    this.declarations = new (require('./declarations'))(actions);
    this.applications = new (require('./applications'))(actions);
};