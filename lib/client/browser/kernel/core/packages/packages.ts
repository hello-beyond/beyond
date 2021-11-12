import {Require} from "../import/requirejs";

declare const amd_require: Require;

// The registered packages
export class Packages extends Set<string> {
    register(pkg: string, path?: string) {
        const paths: Record<string, string> = {};

        path = typeof path === 'string' ? path : `packages/${pkg}`;
        path = path ? path : '.';
        paths[pkg] = path;
        typeof amd_require === 'function' && amd_require.config({paths});

        this.add(pkg);
    }
}
