module.exports = async function (application, distribution, url, language) {
    // Check if the @beyond-js/local bee if running
    await require('./beyond-local').check(application);

    const {html, errors} = await application.resources.index.content(url, distribution, language);
    if (errors?.length) {
        let message = `<h1>${errors.length} ${errors.length === 1 ? 'error' : 'errors'} found:<br/></h1>`;
        message += '<ul>';
        errors.forEach(error => message += `<li>${error}</li>`);
        message += '</ul>';
        return new Resource({404: message, extname: '.html'});
    }

    return new Resource({type: 'content', content: html, extname: '.html'});
}
