module.exports = class Backend extends require('./bundle') {
    _identifier = 'backend';
    _files = ['*'];
    _path;

    skeleton = ['path', 'files'];

    getProperties() {
        return {
            path: "backend",
            files: "*"
        }
    }
}