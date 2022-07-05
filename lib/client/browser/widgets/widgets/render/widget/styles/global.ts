import {Events} from '../../events';

export /*bundle*/ const globalcss = new class extends Events {
    #version = 0;

    get link() {
        const version = this.#version !== 0 ? `?version=${this.#version}` : '';
        return `${(<any>window).baseUrl}/global.css${version}`;
    }

    update() {
        this.#version++;
        this.trigger('change');
    }
}
