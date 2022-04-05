export function Page() {

    ReactDOM.render(React.createElement(DsHeaderBar, {texts: module.texts}), this.container);

    this.container.id = 'app-headr=bar-page';
    this.container.classList.add('page');
}

