const {PathnameParser} = global;

module.exports = async function (url, application, distribution) {
    'use strict';

    if (!url.pathname.includes('/src/')) return;

    let [pathname, file] = url.pathname.split('/src/');
    const parsed = new PathnameParser(application, pathname);
    await parsed.process();

    if (parsed.error) return new global.Resource({'404': parsed.error});
    if (parsed.is !== 'processor') return new global.Resource({'404': 'Source not found'});

    const {error, bundle} = await parsed.find(distribution);
    if (error) return new global.Resource({'404': error});

    // Getting the packager
    const {language} = parsed;
    const packager = bundle.packagers.get(distribution, language);
    await packager.ready;
    await packager.dependencies.ready;

    const {processors} = packager;
    await processors.ready;
    if (!processors.has(parsed.processor)) {
        return new global.Resource({'404': `Processor "${parsed.processor}" not found on resource "${bundle.resource}"`});
    }

    const processor = processors.get(parsed.processor);
    const is = file.startsWith('overwrites/') ? 'overwrites' : 'files';
    file = is === 'overwrites' ? file.slice(11) : file;
    const sources = processor.sources[is];
    if (is === 'overwrites' && !sources) {
        return new global.Resource({'404': `Processor "${processor.name}" does not support overwrites`});
    }

    await sources.ready;

    if (!sources.has(file)) {
        return new global.Resource({'404': `${is === 'overwrites' ? 'Overwrite' : 'Source'} "${file}" not found`});
    }

    const source = sources.get(file);
    await source.ready;

    const info = url.searchParams.has('info');
    if (info) {
        return await require('./info')(processor, source, distribution);
    }
    else {
        const {content, extname} = source;
        return new global.Resource({content, extname});
    }
}
