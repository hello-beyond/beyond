const prettier = require("prettier");
module.exports = function (parent) {
    parent.format = async function ({filename, content}) {

        console.log(1, {
            parser: 'babel',
            filepath: filename,
            singleQuote: true,
        });
        try {
            const formattedText = prettier.format(content, {
                parser: 'babel',
                filepath: filename,
                singleQuote: true,
            });

            return {status: true, text: formattedText};
        }
        catch (e) {
            console.log(e);
            return {error: e};
        }
    };
}
