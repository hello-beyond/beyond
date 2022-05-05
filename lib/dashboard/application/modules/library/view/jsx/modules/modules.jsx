class Modules extends React.Component {

    onClickModules(library) {
        beyond.navigate(`/library/modules/${library.name}`);
    }

    render() {

        const {modules, library, texts} = this.props;
        if (!modules.loaded) return null;

        const list = [];

        let count = modules.counters.all.fetched ? modules.counters.all.value : '0';

        return (
            <section className="detail" onClick={() => this.onClickModules(library)}>
                <DashboardIcon className="detail-icon" name="folder-plus"/>
                <div className="detail-content">
                    <h3>{texts.titles.modules}</h3>
                    <div className="description">({count}) {texts.elements.count}</div>
                </div>
                <DashboardIconButton className="detail-icon" icon="expandMore"/>
            </section>
        );

    }

}
