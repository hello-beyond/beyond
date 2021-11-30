const {parentPort} = require('worker_threads');
const ts = require('typescript');

function process(message) {
    const {path, sources, options} = message;
    const files = new Map(sources.files);
    const dependencies = new Map(sources.dependencies);

    const host = new (require('./host'))(path, files, dependencies, options);
    const program = ts.createProgram([...files.keys()], options, host);
    const result = program.emit();

    const compilation = {output: host.output, diagnostics: result.diagnostics};
    const data = new (require('./data'))(files, compilation);

    // The host object extends a map that stores the emitted files
    parentPort.postMessage({
        type: 'processed',
        data: JSON.stringify(data)
    });
}

parentPort.on('message', process);
