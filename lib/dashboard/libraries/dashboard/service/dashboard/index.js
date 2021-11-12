module.exports = function () {
    const code = 'b3d421';

    this.validate = params => params?.hash?.toUpperCase() === code.toUpperCase();

}
