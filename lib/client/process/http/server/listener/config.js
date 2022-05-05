module.exports = async function (application, distribution) {
    const config = application.config.get(distribution);
    await config.ready;

    if (!config.valid) return new global.Resource({'500': `Application configuration is invalid`});

    return new global.Resource({content: config.code, extname: '.js'});
}
