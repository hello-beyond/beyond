export function Page() {

    const database = new Database();
    database.create();
    ReactDOM.render(React.createElement(View, {
        'database': database
    }), this.container);

    this.container.classList.add('app-indexdb-page');

    //connection();

}

