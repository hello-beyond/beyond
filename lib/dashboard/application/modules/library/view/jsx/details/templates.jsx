class Templates extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let {texts} = this.props;
        const templates = [{
            'id': 1,
            'path': 'c://ruta/libraries'
        }]; //remplazar library por libraries.items

        return (
            <div className="detail">
                <DashboardIcon className="detail-icon" name="archive"/>
                <div className="detail-content">
                    <h3>{texts.titles.temoplates}</h3>
                    <article className="collapse-container">
                        {templates.map(template => <p key={template.id}>{template.path}</p>)}
                    </article>
                </div>
                <DashboardIconButton className="detail-icon" icon="expandMore"/>
            </div>
        );
    }

}