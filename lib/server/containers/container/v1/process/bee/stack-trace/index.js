module.exports = bundles => Error.prepareStackTrace = function (err, frames) {
    if (!frames?.length) {
        return err instanceof Error ? err.stack : void 0;
    }

    let stack = `${err.message}`;
    for (const frame of frames) {
        const original = {};
        const file = frame.getFileName();
        original.is = frame.isNative() ? 'native' : 'node';
        original.fnc = frame.getFunctionName();
        original.method = frame.getMethodName();
        original.top = frame.isToplevel();
        original.constructor = frame.isConstructor();
        original.async = frame.isAsync();
        original.file = !file?.startsWith('/node_modules/') ?
            file :
            file.substr(14, file.length - 17); // Remove /node_modules/ and the .js extension
        original.line = frame.getLineNumber();
        original.column = frame.getColumnNumber();

        const push = ({is, found, fnc, method, top, constructor, async, file, line, column}) => {
            // Actually unused properties
            void (found);
            void (top);
            void (constructor);

            async = async ? 'async ' : '';
            const name = (fnc ? `${fnc} ` : '') + (!fnc && method ? `${method} ` : '');
            const location = (file ? `${file}` : '') + (line && column ? `:${line}:${column}` : '');
            stack += `\n    at [${is}] ${name}(${location ? location : '<anonymous>'})`;
        }

        if (bundles.has(original.file)) {
            const bundle = bundles.get(original.file);
            const {map} = bundle;

            const entry = map.findEntry(original.line, original.column);
            const file = entry.originalSource;
            const line = entry.originalLine;
            const column = entry.originalColumn;

            if (file && line) {
                const found = true, is = 'beyond';
                push(Object.assign(original, {found, is, entry, file, line, column}));
            }
            else {
                push(Object.assign(original, {found: false}));
            }
        }
        else {
            push(Object.assign(original, {found: false}));
        }
    }

    return stack;
}
