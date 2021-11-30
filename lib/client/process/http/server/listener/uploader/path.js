module.exports = async function (id, type, application) {
    if (type === 'application') {
        return application.path;
    }

    if (type === 'module') {
        await application.modules.ready;
        if (!application.modules.has(id)) return;

        const module = application.modules.get(id);
        return module.path;
    }

    //is overwrite
    await application.template.ready;
    await application.template.overwrites.ready;
    return application.template.overwrites.path;
}