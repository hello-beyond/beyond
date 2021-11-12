module.exports = function (message) {
    let {start, bundles} = message;
    bundles = new Map(bundles);

    console.log(start, bundles);
}
