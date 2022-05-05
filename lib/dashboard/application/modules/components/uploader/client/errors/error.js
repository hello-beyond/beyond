export class ResourceSelectorError extends Error {

    constructor(code, message) {
        super();
        Object.defineProperty(this, 'code', {'get': () => code});
        Object.defineProperty(this, 'message', {'get': () => message});
    }

}
