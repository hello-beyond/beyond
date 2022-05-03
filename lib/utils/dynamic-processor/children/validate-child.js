module.exports = function (child, name) {
    if (name && typeof name !== 'string') throw new Error('Invalid child name specification');

    const nameText = name ? `"${name}" ` : '';

    if (!child) {
        throw new Error(`Child property ${nameText}is undefined`);
    }
    if (typeof child.on !== 'function' || typeof child.initialise !== 'function') {
        throw new Error(`Child property ${nameText}is not a dynamic processor`);
    }
    if (!child.dp) {
        throw new Error(`Child ${nameText}must have the property .dp set`);
    }
}
