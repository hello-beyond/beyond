module.exports = function (styles) {
    let content = `<h1>Application styles diagnostics report</h1>`;

    const {diagnostics} = styles;
    if (diagnostics.valid) {
        content += 'No errors reported.';
    }
    else {
        if (diagnostics.general.length) {
            diagnostics.general.forEach(error => {
                content += `<li>${error}</li>`;
            });
        }

        const processList = (name, list) => {
            if (!list || !list.size) return;

            content += `<h3>Errors found on ${list.size} ` +
                `${list.size === 1 ? name.singular : name.plural}</h3>`;

            list.forEach((diagnostics, source) => {
                content += `<h4>${source}</h4><ul>`;
                diagnostics.forEach(diagnostic => {
                    const {line, character} = diagnostic;
                    const position = line && character ? `${line}:${character} - ` : '';
                    content += `<li>${position}${diagnostic.message}</li>`;
                });
                content += '</ul>';
            });
        };
        processList({singular: 'file', plural: 'files'}, diagnostics.files);
    }

    return `<html lang="en"><body>${content}</body></html>`;
}
