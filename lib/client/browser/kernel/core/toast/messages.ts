export enum MessageType {
    'GeneralMessage',
    'GeneralError',
    'ConnectionError',
    'Warning'
}

export interface Message {
    id: string,
    type: MessageType,
    text?: string,
    duration: number,
    close?: boolean,
    retry?: () => void
}

export class Messages {
    #map: Map<string, Message> = new Map;
    #ordered: string[] = [];

    get keys(): string[] {
        return this.#ordered.slice();
    }

    get first(): Message {
        return this.#map.get(this.#ordered[0]);
    }

    set(message: Message) {
        if (typeof message !== 'object') {
            console.log(message);
            throw new Error('Message parameter is invalid');
        }

        let id = message.id;
        if (typeof id !== 'string') {
            console.log(message);
            throw new Error('Invalid message id');
        }

        this.#map.set(id, message);

        let index = this.#ordered.indexOf(id);
        if (index !== -1) {
            this.#ordered.splice(index, 1);
        }

        this.#ordered.push(id);
    }

    has = (id: string): boolean => this.#map.has(id);
    get = (id: string): Message => this.#map.get(id);

    typeExists(type: MessageType): boolean {
        let exists = false;
        this.#map.forEach(message => {
            if (exists) return;
            if (message.type === type) exists = true;
        });

        return exists;
    }

    delete(message: Message | string): void {
        const id: string = typeof message === 'object' ? message.id : message;
        if (typeof id !== 'string') {
            throw new Error('Message id is invalid');
        }

        this.#map.delete(id);

        const index = this.#ordered.indexOf(id);
        if (index !== -1) {
            this.#ordered.splice(index, 1);
        }
    }
}
