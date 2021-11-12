module.exports = class Start extends require('./bundle') {
    _identifier = 'start';

    skeleton = [];

    getProperties() {
        return {
            ts: {
                path: "start",
                files: "start.ts"
            }
        }
    }
}