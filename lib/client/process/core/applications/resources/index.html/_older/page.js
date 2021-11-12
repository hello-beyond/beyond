module.exports = class {
    #application;
    #html;

    async content() {
        const html = this.children.get('skeleton').child;

        if (ssr) {
            console.log('getting ssr');
            // const parser = await html.$();
            // const layouts = parser('div.layouts-container');
            // layouts.append(await ssr.content());
        }
        return (this.#content = await html.content());
    }

    constructor(application) {
        this.#application = application;
    }
}
