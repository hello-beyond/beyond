module.exports = function (ipc) {
    this.modules = new (require('./modules'))(ipc);
    this.template = new (require('./template'))(ipc);
    this.application = new (require('./application'))(ipc);
}
