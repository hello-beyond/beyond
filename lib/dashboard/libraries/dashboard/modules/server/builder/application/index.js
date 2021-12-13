/**
 *
 * @param service
 */
module.exports = function (service) {
    this.edit = service.builder.application.edit;
    this.setDistribution = service.builder.application.setDistribution;
    this.create = service.builder.application.create;
    this.backend = service.builder.application.backend;
    this.checkPort = service.builder.application.checkPort;
    this.checkStatic = service.builder.application.checkStatic;
};
