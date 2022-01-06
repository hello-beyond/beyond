import type {Beyond} from "../../beyond";
import type {IDependencies} from "./dependencies";
import type {Container} from "../bundles";
import {Bundle} from "../bundle";
import {PackageData} from "../../package/data";
import type {IProcessorsSpecs} from "../../modules/module";

declare function require(module: string): any;

export class BundlesInstances extends Map<string, Bundle> {
    obtain(id: string, multilanguage: boolean, specs: IProcessorsSpecs, dependencies?: IDependencies): Bundle {
        const beyond = <Beyond>(require('../../beyond')).beyond;

        const split = id.split('/');
        const bundleName = split.pop(); // Remove the bundle name
        const module = split.join('/');

        // Create the bundle
        const container: Container = ((): Container => {
            const pkg = new PackageData(id);

            // Check if the container of the module is the application
            const {application} = beyond;
            if (application.package?.id === pkg.id) return application.modules.obtain(module, specs);

            // Check if the container of the module is a library
            const {libraries} = beyond;
            if (libraries.has(pkg.id)) {
                const library = libraries.get(pkg.id);
                return module === pkg.id ? library : library.modules.obtain(module, specs);
            }

            // If the container of the module is not the application or a library, the it is an external module
            return application.externals.obtain(id, specs);
        })();

        const bundle = container.bundles.obtain(bundleName, multilanguage, dependencies);
        this.set(bundle.id, bundle);
        return bundle;
    }
}

export const instances = new BundlesInstances();
