module.exports = class Ts extends require('./bundle') {
    _identifier = 'ts';

    skeleton = [];

    getProperties() {
        return {
            "path": "./ts",
            "files": "*"
        }
    }
}