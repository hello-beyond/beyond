export function Page() {

    const library = new Library(this.vdir);
    ReactDOM.render(React.createElement(View, {'library': library}), this.container);

}
