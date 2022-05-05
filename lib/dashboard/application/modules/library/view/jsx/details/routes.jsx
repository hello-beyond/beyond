class Routes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let {texts} = this.props;
        const routes = [{
            'id': 1,
            'path': 'c://ruta/libraries'
        }]; //remplazar por el original

        return (
            <div className="detail">
                <DashboardIcon className="detail-icon" name="folder-plus"/>
                <div className="detail-content">
                    <h3>{texts.titles.routes}</h3>
                    <article className="collapse-container">
                        {routes.map(route => <p key={route.id}>{route.path}</p>)}
                    </article>
                </div>
                <DashboardIconButton className="detail-icon" icon="expandMore"/>
            </div>
        );
    }

}