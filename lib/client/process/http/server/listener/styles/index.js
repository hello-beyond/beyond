module.exports = async function (application, distribution, url) {
    const pathnames = ['/styles.css', '/styles.css.html', '/global.css', '/global.css.html'];
    const {pathname} = url;
    if (!pathnames.includes(pathname)) return;
    const showDiagnostics = pathname.endsWith('.html');

    const is = pathname.startsWith('/styles.css') ? 'application' : 'global';

    const styles = application.styles[is].get(distribution);
    await styles.ready;

    if (showDiagnostics) {
        return styles.valid ?
            new global.Resource({
                content: 'Application styles is not reporting any errors or warnings',
                extname: '.html'
            }) :
            new global.Resource({'500': require('./errors')(styles), extname: '.html'});
    }
    else {
        return styles.valid ?
            new global.Resource({content: styles.value ? styles.value : '', extname: '.css'}) :
            new global.Resource({'500': 'Application styles compiled with errors'});
    }
}
