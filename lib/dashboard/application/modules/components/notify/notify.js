function Notify() {
    this.events = new Events({bind: this});

    let value;
    Object.defineProperty(this, 'value', {get: () => value});

    const set = (msj, type) => {
        value = {message: msj, type: type};
        this.events.trigger('change');
    };

    this.info = message => set(message, 'info');
    this.error = message => set(message, 'error');
    this.success = message => set(message, 'success');
    this.warning = message => set(message, 'warning');
}

export const NotifyManager = new Notify();