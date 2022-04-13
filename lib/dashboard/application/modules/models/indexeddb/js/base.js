function BeyondDBBase(parent) {

    const events = new Events({'bind': parent});
    this.triggerChange = (event = 'change') => events.trigger(event);

    const databases = new Map();
    Object.defineProperty(this, 'databases', {'get': () => databases});

}