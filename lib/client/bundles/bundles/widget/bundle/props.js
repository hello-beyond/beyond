module.exports = function (props, warnings) {
    if (!props) return;

    if (!(props instanceof Array)) {
        warnings.push(`Element properties (props property of the element) must be an array`);
        return;
    }

    let valid = true;
    props.forEach(prop => typeof prop !== 'string' || !prop && (valid = false));
    if (!valid) {
        warnings.push(`Element properties has at least one invalid property`);
        return;
    }

    return props;
}
