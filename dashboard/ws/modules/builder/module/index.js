/**
 *
 * @param service
 */
module.exports = function (service) {
    this.edit = service.builder.modules.edit;
    this.clone = service.builder.modules.clone;
    this.create = service.builder.modules.create;
    this.addBundle = service.builder.modules.addBundle;
};

