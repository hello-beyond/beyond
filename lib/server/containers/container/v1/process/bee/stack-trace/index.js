module.exports = bundles => Error.prepareStackTrace = function (err, frames) {
    if (!frames?.length || !(err instanceof Error)) {
        return err instanceof Error ? err.stack : void 0;
    }

    const stack = [];
    for (const frame of frames) {
        const original = {};
        const file = frame.getFileName();
        original.file = !file?.startsWith('/node_modules/') ?
            file :
            file.substr(14, file.length - 17); // Remove /node_modules/ and the .js extension
        original.line = frame.getLineNumber();
        original.column = frame.getColumnNumber();
        original.is = frame.isNative() ? 'native' : 'node';

        if (bundles.has(original.file)) {
            const bundle = bundles.get(original.file);
            const {id, map} = bundle;
            const entry = map.findEntry(original.line, original.column);

            const file = `${id}/${entry.originalSource}`;
            const line = entry.originalLine;
            const column = entry.originalColumn;

            if (file && line) {
                const is = 'beyond', found = true;
                stack.push({is, found, file, line, column});
            }
            else {
                const {is, file, line, column} = original;
                const found = false;
                stack.push({is, found, file, line, column});
            }
        }
        else {
            const {is, file, line, column} = original;
            const found = false;
            stack.push({is, found, file, line, column});
        }
    }

    const {message} = err;
    return {is: '__beyond_stack', message, stack};
}
