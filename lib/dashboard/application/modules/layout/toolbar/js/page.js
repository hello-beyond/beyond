export function Page() {

    ReactDOM.render(React.createElement(AppHome, {
        texts: module.texts.current,
    }), this.container);

    this.container.id = 'app-toolbar-page';
    this.container.classList.add('page');
}

