module.exports = function (file, _interface) {
    _interface.dependencies.set('svelte/internal', {is: 'import'});
    file.toLowerCase() === 'widget.svelte' && _interface.exports.push({name: 'Widget', from: 'default'});
}
