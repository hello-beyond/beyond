module.exports = new class {
    get(packager) {
        const {distribution} = packager.specs;

        let name = distribution.ts && ['tsc', 'transpiler'].includes(distribution.ts.compiler) && distribution.ts.compiler;
        name = distribution.dashboard ? 'tsc' : name;
        name = name ? name : 'transpiler';

        return name === 'transpiler' ?
            new (require('./transpiler'))(packager) :
            new (require(`./tsc`))(packager);
    }
}
