export function Layout() {

    this.control = ReactDOM.render(React.createElement(Control, {
        parent: this,
        docs: DsDocs
    }), this.container);
    this.container.classList.add('ds-layout-editor');

}
