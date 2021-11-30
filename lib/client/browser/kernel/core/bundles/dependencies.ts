import type {IDependencies} from "./instances/dependencies";

export class Dependencies extends Set<string> {
    update(dependencies: IDependencies) {
        this.clear();
        dependencies && [...dependencies.keys()].forEach(resource => this.add(resource));
    }
}
