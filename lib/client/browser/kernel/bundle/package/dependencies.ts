export default class extends Set<string> {
    update(deps?: Set<string>) {
        this.clear();
        deps?.forEach(resource => this.add(resource));
    }
}
