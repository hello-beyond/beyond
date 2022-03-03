module.exports = new class {
    // The dps (dynamic processors) that are pendings of other dps
    #pendingsRegistry = new Map();

    // The set of pendings by parent dp
    #dpsRegistry = new Map();

    /**
     * Inform the pendings of a dynamic processor after _prepare was executed
     *
     * @param dp {object} The dynamic processor being processed
     * @param pendings {Map<dp, {processor: object, id?: string}>} The dynamic processors that are pending to be processed
     */
    informPendings(dp, pendings) {
        if (!dp || !pendings) throw new Error('Invalid parameters');

        this.cleanPendings(dp);
        pendings && this.#dpsRegistry.set(dp, pendings);

        pendings?.forEach((specs, pending) => {
            if (this.#pendingsRegistry.has(pending)) {
                this.#pendingsRegistry.get(pending).add(dp);
            }
            else {
                const set = new Set();
                this.#pendingsRegistry.set(pending, set);
                set.add(dp);
            }
        });
    }

    /**
     * Clean up the previous pendings of a dynamic processor
     *
     * @param dp {object} The dynamic processor
     */
    cleanPendings(dp) {
        // Remove the previous pendings of the dp being informed
        const previous = this.#dpsRegistry.get(dp);
        previous?.forEach(previousDp => {
            if (!this.#pendingsRegistry.has(previousDp)) {
                console.warn('Previous DP not found');
                return;
            }
            const dps = this.#pendingsRegistry.get(previousDp);
            dps.delete(dp);
            !dps.size && this.#pendingsRegistry.delete(previousDp);
        });

        this.#dpsRegistry.delete(dp);
    }

    /**
     * Inform that the dynamic processor has been processed
     *
     * @param dp {object} The dynamic processor that has been processed
     */
    informProcessed(dp) {
        if (!this.#pendingsRegistry.has(dp)) return;

        const dps = this.#pendingsRegistry.get(dp);
        dps.forEach(dp => dp._invalidate());
    }
}
