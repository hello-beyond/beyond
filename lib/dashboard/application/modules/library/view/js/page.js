export function Page() {

    const library = new Library({
        identifier: {id: parseInt(this.vdir)},
        tree: {
            properties: {
                modules: {
                    properties: {
                        counters: true,
                        module: {
                            properties: {
                                container: true,
                                bundles: {
                                    properties: {
                                        processors: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    library.load({modules: {counters: {all: true}}});

    const actions = new Actions(library);
    ReactDOM.render(React.createElement(View, {
        library: library,
        actions: actions,
        texts: module.texts
    }), this.container);

}
