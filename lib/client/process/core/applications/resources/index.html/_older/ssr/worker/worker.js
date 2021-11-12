const {parentPort} = require('worker_threads');

function process(message) {
    const {action} = message;
    if (!['render', 'process-url'].includes(action)) throw new Error('Invalid message');

    const response = require(`./actions/${action}`)(message);

    // The host object extends a map that stores the emitted files
    parentPort.postMessage(Object.assign({type: 'processed'}, response));
}

parentPort.on('message', process);
