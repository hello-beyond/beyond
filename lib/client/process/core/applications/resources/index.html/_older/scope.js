module.exports = function (source) {

    // Add an extra tab in all lines
    source = source.replace(/\n/g, '\n    ');
    source = '    ' + source + '\n';

    let output = '';
    output += '(function () {\n\n';
    output += source;
    output += `})();`;

    return output;

};
