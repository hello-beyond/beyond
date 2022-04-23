import type {IDependencies} from "./dependencies";
import type {Container} from "../bundles";
import type {IModuleSpecs} from "../../modules/module";
import {Bundle} from "../bundle";
import {PackageData} from "../../package/data";

export interface IBundleFactorySpecs {
    module?: {
        dirname: string;
    }
    // To know if the container of the bundle has a txt bundle
    txt?: {
        multilanguage: boolean
    }
}

export class BundlesInstances extends Map<string, Bundle> {
    obtain(id: string, multilanguage: boolean, specs: IBundleFactorySpecs, dependencies?: IDependencies): Bundle {
        const {beyond} = require('../../beyond');

        const split = id.split('/');
        const bundleName = split.pop(); // Remove the bundle name
        const module = split.join('/');

        // Create the bundle
        const container: Container = ((): Container => {
            const pkg = new PackageData(id);

            const mspecs: IModuleSpecs = {dirname: specs.module?.dirname, txt: specs.txt};

            // Check if the container of the module is the application
            const {application} = beyond;
            if (application.package?.id === pkg.id) return application.modules.obtain(module, mspecs);

            // Check if the container of the module is a library
            const {libraries} = beyond;
            if (libraries.has(pkg.id)) {
                const library = libraries.get(pkg.id);
                return module === pkg.id ? library : library.modules.obtain(module, mspecs);
            }

            // If the container of the module is not the application or a library, the it is an external module
            return application.externals.obtain(id, mspecs);
        })();

        const bundle = container.bundles.obtain(bundleName, multilanguage, dependencies);
        this.set(bundle.id, bundle);
        return bundle;
    }
}

export const instances = new BundlesInstances();
