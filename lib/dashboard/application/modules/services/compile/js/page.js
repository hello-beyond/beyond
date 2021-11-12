export function Page() {

    const texts = module.texts;

    this.show = () => {

        const service = new Service(this.qs.id);
        const id = service.id.split('/');
        const is = id[0];
        const name = id[1];

        service.load();

        ReactDOM.render(React.createElement(View, {
            'is': is,
            'name': name,
            'texts': texts,
            'service': service
        }), this.container);
    }

    /**
     * The component is unmmount to clean all functionality selected,
     * There is not a standard defined to make it (clean up a component or state component),
     * each case must be evaluated in separated way. In this case, all state is managed by
     * the main react component and is not necessary has memory about that.
     */
    this.hide = () => {
        ReactDOM.unmountComponentAtNode(this.container);
    }

}
