module.exports = async function (application, distribution, url) {
    if (url.pathname !== '/styles.css' && url.pathname !== '/styles.css.html') return;
    const showDiagnostics = url.pathname === '/styles.css.html';

    const styles = application.styles.get(distribution);
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
