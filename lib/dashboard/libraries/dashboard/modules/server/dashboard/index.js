module.exports = function (service) {
    this.validate = async params => service.dashboard.validate(params);
};