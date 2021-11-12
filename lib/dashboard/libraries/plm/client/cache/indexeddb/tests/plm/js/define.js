async function defineDB() {

    const db = await BeyondDB.create(getConfig());

    let store;
    const save = async (name, data) => {

        store = db.store(name);
        await store.save(data);

    };

    let item = {
        'instanceId': '123456789',
        'item': {'id': 1, 'name': 'Prueba', 'email': 'prueba@jidadesarrollos.com'}
    };
    let item2 = {
        'instanceId': '212121',
        'item': {'id': 2, 'name': 'Otra Prueba', 'email': 'prueba@jidadesarrollos.com'}
    };
    await save('unpublished', item);
    await save('unpublished', item2);

}