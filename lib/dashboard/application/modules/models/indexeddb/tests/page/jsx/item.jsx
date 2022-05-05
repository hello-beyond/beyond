class Item extends React.Component {

    constructor(props) {
        super(props);

    }

    delete() {
        const {database} = this.props;
        database.removeItem(this.props.data.id);
    }

    render() {
        const {data} = this.props;
        return (
            <div>
                <div>
                    {data.name}
                </div>
                <button onClick={this.delete.bind(this)}>Eliminar</button>
            </div>
        );
    }

}