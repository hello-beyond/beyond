export function Page() {

    const library = new Library({
        'identifier': {'name': this.vdir},
        'tree': {
            'properties': {
                'modules': {
                    'properties': {
                        'module': true
                    }
                }
            }
        }
    });
    library.load({'modules': {'items': {'module': true}}});
    window.l = library;
    ReactDOM.render(React.createElement(View, {'library': library}), this.container);

}
