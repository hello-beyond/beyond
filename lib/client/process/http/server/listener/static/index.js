const qs = require('querystring');

/**
 * Serves the static files of the application, the libraries and the modules
 *
 * @param application {object} The application object
 * @param url {object} The parsed url being served
 * @return {Promise<void>}
 */
module.exports = async function (application, url) {
    const {pathname} = url;

    // If the pathname does not includes '/static/', it can only be an application static resource
    if (!pathname.includes('/static/') || pathname.startsWith('/static/')) {
        return await require('./application')(application, url);
    }

    const parsed = new (require('./parser'))(application, url);
    if (parsed.error) return parsed.error;

    const original = qs.parse(url.query).original !== undefined;

    return await parsed.name ?
        require('./modules')(application, parsed, original) :
        require('./libraries')(application, parsed, original);
}
