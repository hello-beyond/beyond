class Modules extends React.Component {

    render() {

        const modules = this.props.modules;

        if (!modules.loaded) return null;

        const list = [];
        modules.items.forEach(module => {
            const id = module.id.split('//')[2];
            list.push(<div key={module.id}>{id}</div>);
        });

        let count = modules.counters.all.fetched ? modules.counters.all.value : '';
        count = count ? `(${count})` : '';

        return (
            <section className="list">
                <h4>Modules {count}</h4>
                <div className="items">{list}</div>
            </section>
        );

    }

}
