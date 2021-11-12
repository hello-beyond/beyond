class Libraries extends React.Component {

    constructor(props) {
        super(props);
    }

    onClick(library) {
        //beyond.navigate(`/library/module/${library.name}`);
    }

    render() {

        let {libraries, texts} = this.props;

        let count = libraries && libraries.counters.all.fetched ? libraries.counters.all.value : 0;

        return (
            <div className="detail">
                <DashboardIcon className="detail-icon" name="archive"/>
                <div className="detail-content">
                    <h3>{texts.titles.libraries}</h3>
                    <div className="description">({count}) {texts.elements.count}</div>
                    <article className="collapse-container">
                        {/*{library.map(library => <p key={library.id}>{library.path}</p>)}*/}
                    </article>
                </div>
                <DashboardIconButton className="detail-icon" icon="expandMore"/>
            </div>
        );
    }

}
