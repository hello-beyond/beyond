import {attributes} from '../attributes';

export class ControllerAttributes {
    #body: HTMLSpanElement;
    get body() {
        return this.#body;
    }

    set body(value) {
        this.#body = value;
        attributes.values.forEach((value, name) => this.#body.setAttribute(name, value));
    }

    #add = (attribute: string, value: string) => {
        this.#body?.setAttribute(attribute, value);
    }

    #remove = (attribute: string) => {
        this.#body?.removeAttribute(attribute);
    }

    constructor() {
        attributes.on('add', this.#add);
        attributes.on('remove', this.#remove);
    }

    destroy() {
        attributes.off('add', this.#add);
        attributes.off('remove', this.#remove);
    }
}
