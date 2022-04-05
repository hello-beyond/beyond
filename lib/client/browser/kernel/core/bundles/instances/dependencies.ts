export type Dependency = Record<string, any>;
export type IDependencies = Map<string, Dependency>;

export class Dependencies extends Map<string, Dependency> {
    register(dependencies: IDependencies) {
        dependencies.forEach((value, key) => this.set(key, value));
    }
}

export const dependencies = new Dependencies();
