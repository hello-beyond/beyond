function Database() {

    const events = new Events({'bind': this});

    const config = {
        'name': 'test2',
        'version': 1,
        'stores': [
            {
                'name': 'customers',
                'config': {'keyPath': 'id', 'autoIncrement': true},
                'indexes': [
                    ['name', 'name', {'unique': false}],
                    ['email', 'email', {'unique': true}]
                ]
            }
        ]
    };

    let db, store;

    let items;
    Object.defineProperty(this, 'items', {'get': () => items});
    let ready;
    Object.defineProperty(this, 'ready', {'get': () => ready});

    this.removeItem = async (id) => {
        store = db.store('customers');
        await store.delete(id);
        items = await store.getAll();
        events.trigger('change');
    };

    this.create = async () => {

        await BeyondDB.delete(config.name)
        db = await BeyondDB.create(config);

        store = db.store('customers');
        await store.save([
            {'id': 3, 'name': 'Moises', 'email': 'jcontreras@jidadesarrollos.com'},
            {'id': 4, 'name': 'Jean', 'email': 'mrodriguez@jidadesarrollos.com'}
        ]);

        window.asd = store;
        await store.save([{'id': 3, 'name': 'Moises', 'email': 'isMoises@jidadesarrollos.com'}]);

        items = await store.getAll();
        ready = true;
        events.trigger('change');

    }

}