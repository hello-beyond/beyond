module.exports = async function (application, distribution, url) {
    // Check if @beyond-js/local if running
    await require('./beyond-local').check(application);

    const content = await application.resources.index.content(url, distribution);
    return new Resource({type: 'content', content: content, extname: '.html'});
}
