import {bundle} from 'beyond_context';

(async () => {
    const socket = await bundle.container.socket;
    socket.on('bees.log', message => {
        console.log('BEE log message received:', message);
    });
})().catch(exc => console.error(exc.stack));
