export function Page() {

    ReactDOM.render(React.createElement(View, {}), this.container);
    this.container.classList.add('app-indexed-plm-page');

    defineDB();

}

