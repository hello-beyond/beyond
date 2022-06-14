module.exports = async function (application, distribution, url) {
    const pathnames = ['/styles.css', '/styles.css.html', '/global.css', '/global.css.html'];
    const {pathname} = url;
    if (!pathnames.includes(pathname)) return;

    const is = pathname.startsWith('/styles.css') ? 'application' : 'global';

    const styles = application.styles[is].get(distribution);
    await styles.ready;

    const {code} = (() => {
        if (!styles.valid || !styles.value) return {};
        const code = styles.value;
        return typeof code === 'string' ? {code} : code;
    })();

    const info = url.searchParams.has('info');
    if (info) {
        return await require('./info')(styles);
    }
    else {
        return styles.valid ?
            new global.Resource({content: code ? code : '', extname: '.css'}) :
            new global.Resource({'500': 'Application styles compiled with errors'});
    }
}
