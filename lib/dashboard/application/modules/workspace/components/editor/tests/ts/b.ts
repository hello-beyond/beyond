export class B {

    get name(): string {
        return this.#_name;
    }

    set name(value: string) {
        this.#_name = value;
    }

    #_name: string = `Test`;
}

