((mocha, chai) => {

    mocha.setup('bdd');
    chai.should();

    describe('Index', function () {

        it('should fetch a "tu" action', async () => {

            const table = tables.get('graphs');
            const r1 = await table.fetch({'id': '1'}, 'tu');

            r1.should.equal('Response: 1');

        });

        it('should throw an exception when fetching a "tu" action without having all ' +
            'the fields required to identify the record', async function () {

            const table = tables.get('relations');

            try {
                await table.fetch({'relation_entity': 1}, 'tu');
            }
            catch (exc) {
                exc.should.be.an.instanceof(Error);
            }

        });

    });

    mocha.run();

})(mocha, chai);
