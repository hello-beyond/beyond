module.exports = class extends require('./index') {
    _buildSource(compiled) {
        void (compiled);
        throw new Error('This method should be overridden');
    }

    _build(diagnostics) {
        const process = compiled => {
            const {file} = compiled.relative;
            const id = this.createImID(file);

            if (this.ims?.has(id) && this.ims.get(id).hash === compiled.hash) {
                const im = this.ims.get(id);
                ims.set(id, im);
                return;
            }

            const built = this._buildSource(compiled);
            if (!built) return;

            if (!built.errors && !built.im && !built.ims) throw new Error('Invalid built source received from build function. ' +
                'Build function must return an object with the property errors or the property im set, ' +
                'or can also return undefined');

            if (built.errors) {
                diagnostics.files.set(file, built.errors);
                return;
            }

            built.im && ims.set(id, built.im);
            built.ims?.forEach((im, id) => ims.set(id, im));
        }

        const ims = new Map();
        const {compiler} = this;
        compiler.files.forEach(compiled => process(compiled));

        return {ims};
    }
}
