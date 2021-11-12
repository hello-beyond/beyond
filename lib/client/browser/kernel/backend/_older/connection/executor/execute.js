module.exports = function (action, bundle) {
    if (bundle.error) return {error: bundle.error};

    try {
        const instance = new (bundle.compiled.exports[action.className])();
        return {response: instance[action.method](...action.params)};
    }
    catch (exc) {
        return {error: exc.stack};
    }
}
