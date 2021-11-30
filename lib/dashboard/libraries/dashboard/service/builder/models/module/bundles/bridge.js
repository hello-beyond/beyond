module.exports = class Bridge extends require('./bundle') {
    _identifier = 'bridge';

    skeleton = [];

    getProperties() {
        return {
            path: "bridge",
            files: "*"
        }
    }
}