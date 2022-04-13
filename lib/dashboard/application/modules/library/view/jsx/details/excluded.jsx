class Excluded extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick(library) {
        //beyond.navigate(`/library/module/${library.name}`);
    }

    render() {

        const {excluded, library, texts} = this.props;

        if (!excluded || !excluded.items) return null;

        return (
            <div className="detail">
                <DashboardIcon className="detail-icon" name="chart-pie"/>
                <div className="detail-content">
                    <h3>{texts.titles.excluded}</h3>
                    <article className="collapse-container">
                        {excluded.items.map(excluded => <p key={excluded.id}>{excluded.path}</p>)}
                    </article>
                </div>
                <DashboardIconButton className="detail-icon" icon="expandMore"/>
            </div>
        );
    }

}
