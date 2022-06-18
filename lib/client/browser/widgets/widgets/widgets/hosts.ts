const config = (<any>globalThis).__beyond_config;
const ssr: [string, string][] = config?.ssr;

export default new class extends Map<string, string> {
    constructor() {
        super();
        ssr?.forEach(([pkg, host]) => this.set(pkg, host));
    }

    register(pkg: string, host: string) {
        this.set(pkg, host);
    }
}
