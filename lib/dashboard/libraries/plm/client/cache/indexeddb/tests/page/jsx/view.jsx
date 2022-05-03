class View extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

    }

    updateState() {
        this.setState({});
    }

    componentDidMount() {
        this.props.database.bind('change', this.updateState.bind(this));
    }

    componentWillUnmount() {
        this.props.database.unbind('change', this.updateState.bind(this));
    }

    render() {

        const database = this.props.database;
        let items = [];

        if (database.ready) {
            items = database.items.map(item => <Item key={item.id} database={database} data={item}/>);
        }
        return (
            <div>
                <h1>IndexDB</h1>
                <blockquote>
                    En esta pagina de prueba se realiza:
                    <ol>
                        <li>Creación de una base de datos indexedDB</li>
                        <li>Definición de storas</li>
                        <li>Inserción de datos</li>
                        <li>Se disponibilizan datos para probar inserción y eliminación</li>
                        <li>El store "customers" queda disponible en la consola bajo el nombre global "asd".</li>
                    </ol>
                </blockquote>
                {items}
            </div>
        );
    }
}