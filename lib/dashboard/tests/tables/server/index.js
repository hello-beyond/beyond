module.exports = function () {

    this.graphs = {
        'tu': async params => {

            console.log('Action:', '"tu".'.bold, '\n\tParams:', params);

            const output = {};
            for (const value of params.values) {
                output[value] = `Response: ${value}`;
            }

            return output;

        }
    };

    this.relations = {
        'tu': async params => {

            console.log('Action:', '"tu".'.bold, '\n\tParams:', params);

            const output = {};
            for (const value of params.values) {
                output[value] = `Response: ${value}`;
            }

            return output;

        }
    };

};
