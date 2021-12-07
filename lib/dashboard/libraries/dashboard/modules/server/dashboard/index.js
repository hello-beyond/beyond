module.exports = function (service) {
    this.validate = async params => service.dashboard.validate(params);
    this.cleanCache = async params => service.dashboard.cleanCache(params);
};
