/**
 * Show diagnostics of a external resource
 *
 * @param errors {string[]} The errors of the external resource
 * @return {Promise<string>}
 */
module.exports = async function (errors) {
    let content = `<h1>External resource diagnostics report</h1>`;

    const {length} = errors;
    content += `<h2>${length} ${length === 1 ? 'error' : 'errors'} found:</h2><ul>`;
    errors.forEach(error => content += `<li>${error}</li>`);
    content += '</ul>';

    return `<html lang="en"><body>${content}</body></html>`;
}
