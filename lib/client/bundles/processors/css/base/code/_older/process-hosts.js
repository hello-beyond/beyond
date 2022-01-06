/**
 * Process the hosts of the stylesheet
 *
 * @param source {string} The source code to be processed
 * @param specs {{bundle: {id: string, resource: string, name: string, container: {is: string}, path: string}, distribution: object, application: object, watcher: object}}
 * @return {*}
 */
module.exports = function (source, specs) {
    'use strict';

    const regexp = /#host\.(.*?)#(.*?)[)\s]/g;
    const root = specs.distribution.platform === 'web' ? '/' : '';
    source = source.replace(regexp, (match, host, resource) => {
            switch (host) {
                case 'module':
                    if (specs.bundle.container.is !== 'module') return;

                    // Remove the bundle name from the pathname to obtain the module pathname
                    const split = specs.bundle.pathname.split('/');
                    const pathname = split.slice(0, split.length - 1).join('/');
                    resource = `${root}${pathname}/static${resource})`;
                    break;
                case 'application':
                    resource = `${root}${resource})`;
                    break;
            }
            return resource;
        }
    );
    return source;
}
