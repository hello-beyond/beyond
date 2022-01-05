module.exports = async function (application, model) {
    await application.modules.ready;

    const promises = [];
    application.modules.forEach(module => promises.push(module.ready));
    await Promise.all(promises);

    promises.size = 0;
    application.modules.forEach(module => promises.push(module.bundles?.ready));
    await Promise.all(promises);

    promises.size = 0;
    application.modules.forEach(module => module.bundles.forEach(bundle => promises.push(bundle.ready)));
    await Promise.all(promises);

    const packagers = new Map();
    application.modules.forEach(module =>
        module.bundles.forEach(bundle =>
            packagers.set(bundle.id, bundle.packagers.get(model.distribution()))
        )
    );

    promises.size = 0;
    packagers.forEach(packager => promises.push(packager.ready));
    await Promise.all(promises);

    return packagers;
}