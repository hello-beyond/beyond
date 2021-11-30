const {ipc} = global.utils;

/**
 * Return available ports and
 *
 * @param fallback {number} The port to use if the required port is not available,
 * the following ports will be the numbers immediately above this one
 */
module.exports = function (fallback) {
    'use strict';

    const reserved = new Map();

    const test = port => new Promise((resolve) => {
        const tester = require('net').createServer()
            .once('error', () => resolve(false))
            .once('listening', () => tester.once('close', () => resolve(true)).close())
            .listen(port);
    });

    let processing = false;
    const pendings = []; // Process one request at a time

    /**
     * Reserve a port
     *
     * @param use {string} Used to identify who is using the port. Uses:
     *      . dashboard/main - dashboard/dashboard
     *      . application@path:distribution
     *      . backend@path
     * @param dashboard {boolean} Is the dashboard who is using the port or not?
     * @param port= {number} The port to use. If port is not specified, then the fallback will be used
     * @returns {Promise<number>}
     */
    const reserve = async function (use, dashboard, port) {
        const key = `${use}/${dashboard}`;

        const done = port => {
            reserved.set(key, port);
            return port;
        };

        if (port && await test(port)) return done(port);

        const find = port => [...reserved.values()].find(value => value === port);

        // Ten tries to find a fallback port
        for (let i = 0; i < 10; i++) {
            port = fallback + i;
            if (find(port)) continue;

            if (await test(port)) {
                fallback = port + 1;
                return done(port);
            }
        }
    };

    // Process one request at the time to avoid race conditions
    const process = async () => {
        if (processing) return;
        processing = true;

        let request;
        while ((request = pendings.shift())) {
            const port = await reserve(request.use, request.dashboard, request.port);
            request.promise.resolve(port);
            process().catch(exc => console.error(exc.stack));
        }
        processing = false;
    };

    // Reserves a port, if the port is specified, then it checks if the port is available or not
    // In the case that the port is specified, but not available, or if it is not specified,
    // then an available port is going to be searched
    ipc.handle('ports.reserve', (use, dashboard, port) => {
        if (!use || typeof dashboard !== 'boolean') throw new Error(`Invalid parameters`);

        const key = `${use}/${dashboard}`;
        if (reserved.has(key)) return Promise.resolve(reserved.get(key));

        const promise = Promise.pending();
        pendings.push({use: use, dashboard: dashboard, port: port, promise: promise});

        process().catch(exc => console.error(exc instanceof Error ? exc.stack : exc));
        return promise.value;
    });

    // Returns an available port only if it was previously reserved
    ipc.handle('ports.get', (use, dashboard) => {
        if (!use || typeof dashboard !== 'boolean') throw new Error(`Invalid parameters`);
        const key = `${use}/${dashboard}`;

        return reserved.get(key);
    });

    /**
     * Check if a port is available
     *
     * @param port {number}
     * @returns {Promise<any>}
     */
    ipc.handle('ports.check', async port => {
        for (const previous of reserved.values()) {
            if (previous === port) return false;
        }
        return await test(port);
    });
}
