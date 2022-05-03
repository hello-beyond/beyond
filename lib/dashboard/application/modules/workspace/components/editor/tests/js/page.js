export function Page() {

    const controller = new Controller(this.vdir);

    ReactDOM.render(React.createElement(View, {
        controller: controller,
        texts: module.texts,
    }), this.container);

    this.container.id = 'ds-application-view';
    this.container.classList.add('ds-page', 'ds-application-page', 'flex-page');

    // this.hide = () => model.clean();

}
