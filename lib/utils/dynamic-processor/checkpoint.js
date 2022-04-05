module.exports = class {
    #dp;
    #timer;
    #delay;

    constructor(dp, delay) {
        this.#dp = dp;
        this.#delay = delay ? delay : 20000;
    }

    #checkpoint = () => {
        const dp = this.#dp;

        let id = dp.id ? `: ${dp.id}` : '';
        id = `${dp.dp}${id}`;

        const warning = `Dynamic processor "${id}" is taking more than expected.` +
            (dp.initialising ? ' Processor is still initialising.' : '');
        console.log(warning);

        const unprocessed = [...dp.children.waiting].map(([name, {child}]) => {
            const uninitialised = !dp.initialised ? ' [not initialised]' : '';
            return `${name}${uninitialised}: ${child.dp}`;
        });
        const count = ((unprocessed, total) => unprocessed && `(${unprocessed}/${total})`)(unprocessed.length, dp.children.size);

        unprocessed.length ?
            console.log(`\tUnprocessed children ${count}:`, unprocessed) :
            console.log(`\tChildren processors [${dp.children.size}] are already processed`);

        const pending = [...dp.pending.values()].map(({processor, id}) => {
            id = id ? ` (${id})` : '';
            const state = processor.processed ? 'already processed' : 'not processed';
            let initialisation = processor.initialised ? '' :
                (processor.initialising ? 'initialising' : 'not initialised');
            return `${processor.dp}${id}: ${initialisation ? initialisation : state}`;
        });
        pending.length && console.log('\tWaiting for:', pending);
    }

    set() {
        !this.#timer && (this.#timer = setTimeout(this.#checkpoint, this.#delay));
    }

    release() {
        clearTimeout(this.#timer);
        this.#timer = undefined;
    }
}
