export /*bundle*/
class PendingPromise<T> extends Promise<T> {
    resolve: any;
    reject: any;

    constructor(executor?: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
        // needed for PendingPromise.race/all ecc
        if (executor instanceof Function) {
            super(executor);
            return;
        }

        let resolve = undefined;
        let reject = undefined;
        super((a, b) => {
            resolve = a;
            reject = b;
        });
        this.resolve = resolve;
        this.reject = reject;
    }
}

// For backward compatibility
typeof window === 'object' && ((<any>window).PendingPromise = PendingPromise);
