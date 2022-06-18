import {Events} from "../utils/events/events";
import {Message, Messages, MessageType} from "./messages";

interface MessageSpecObject {
    id?: string | undefined,
    type: MessageType,
    text?: string,
    duration?: number,
    close?: boolean,
    retry?: () => void
}

export type MessageSpec = MessageSpecObject | string;

export class Toast extends Events {
    get MessageType() {
        return MessageType;
    }

    #DURATION_DEFAULT = 3000;
    #messages = new Messages();
    #autoincrement = 0;

    showMessage(specs: MessageSpec, duration?: number) {
        // Check parameters
        if (typeof specs === 'string') {
            specs = {
                type: MessageType.GeneralMessage,
                text: specs,
                duration: duration
            }
        }
        if (typeof specs !== 'object') throw new Error('Invalid parameters');

        if (!specs.type) {
            specs.type = MessageType.GeneralMessage;
        }
        if (specs.retry && typeof specs.retry !== 'function') {
            throw new Error('Invalid parameters, retry must be a function');
        }

        let id: string = specs.id;
        if (!id) {
            this.#autoincrement++;
            id = 'message-' + this.#autoincrement;
        }

        if (specs.type === MessageType.ConnectionError) {
            if (!specs.retry) {
                throw new Error('Invalid parameters, retry was expected');
            }

            this.#messages.set({
                id: id,
                type: MessageType.ConnectionError,
                retry: specs.retry,
                duration: 0 // Infinity
            });
        } else if (specs.type === MessageType.GeneralError) {
            if (!specs.text) {
                throw new Error('Invalid parameters, text was expected');
            }

            if (specs.retry) {
                duration = 0; // Infinity
            } else if (typeof specs.duration === 'number') {
                duration = specs.duration;
            } else {
                duration = this.#DURATION_DEFAULT;
            }

            this.#messages.set({
                id: id,
                type: MessageType.GeneralError,
                text: specs.text,
                retry: specs.retry,
                duration: duration
            });
        } else if (specs.type === MessageType.GeneralMessage) {
            if (!specs.text) throw new Error('Invalid parameters, text was expected');

            this.#messages.set({
                id: id,
                type: MessageType.GeneralMessage,
                text: specs.text,
                close: !!specs.close,
                duration: (typeof specs.duration === 'number') ? specs.duration : this.#DURATION_DEFAULT
            });
        } else if (specs.type === MessageType.Warning) {
            if (!specs.text) {
                throw new Error('Invalid parameters, message was expected');
            }

            this.#messages.set({
                id: id,
                type: MessageType.Warning,
                text: specs.text,
                close: !!specs.close,
                duration: (typeof specs.duration === 'number') ? specs.duration : this.#DURATION_DEFAULT
            });
        } else {
            throw new Error('Invalid parameters, message type is invalid')
        }

        this.trigger('change');
        return id;
    }

    removeMessage(id: Message | string) {
        this.#messages.delete(id);
        this.trigger('change');
    }

    retry() {
        if (!this.#messages.typeExists(MessageType.ConnectionError) && !this.#messages.first) {
            console.error('Retry method was called, but there is no active message');
            return;
        }

        if (this.#messages.typeExists(MessageType.ConnectionError)) {
            let remove = [];
            for (let index in this.#messages.keys) {
                const id = this.#messages.keys[index];

                const message = this.#messages.get(id);
                if (message.type === MessageType.ConnectionError) {
                    message.retry();
                    remove.push(id);
                }
            }

            for (let index in remove) {
                const id = remove[index];
                this.#messages.delete(id);
            }
        } else {
            const message: Message = this.#messages.first;
            typeof message.retry === 'function' ? message.retry() : console.error('Message retry function not set');
            this.#messages.delete(message);
        }

        setTimeout(() => this.trigger('change'), 500)
    }

    close() {
        let message = this.#messages.first;
        if (!message) return;

        if (message.type === MessageType.ConnectionError) {
            console.error('Connection error message type cannot be closed', message);
            return;
        }

        this.#messages.delete(message);
        this.trigger('change');
    }
}
