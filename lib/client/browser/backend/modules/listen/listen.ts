import {BackendServer} from '@beyond-js/backend/server/ts';

interface IBeeSpecs {
    container: {
        id: number,
        is: string,
        dashboard: boolean,
        path: string,
        package: string
    };
    is: string;
    port: number
}

export /*bundle*/ function listen(): void {
    const specs = <IBeeSpecs>(globalThis as any).__beeSpecs;
    new BackendServer(specs.port);
}
