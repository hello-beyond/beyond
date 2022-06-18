export type Dependency = Record<string, any>;
export /*bundle*/ type IDependencies = Map<string, Dependency>;

/**
 * Collection of dependencies of all the created bundles
 */
export /*bundle*/ const externals = new class extends Map {
    register(externals: IDependencies) {
        externals.forEach((value, key) => this.set(key, value));
    }
}

export default externals;
