class View extends React.Component {

    constructor(props) {
        super(props);

        this.update = () => this.setState({});
        this.navigate = this.navigate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.library.bind('change', this.update);
    }

    componentWillUnmount() {
        this.props.library.unbind('change', this.update);
    }

    navigate() {
        const library = this.props.library;
        beyond.navigate(`/cloud/payments/bns?service=${library.name}&type=library`);
    }

    handleSubmit(event) {
        event.preventDefault();
        const library = this.props.library;
        library.builder.build();
    }

    render() {

        const library = this.props.library;

        return (
            <div className="app-library-compile-page">
                <section className="item info-app">
                    <h1>Library <strong>{library.name}</strong></h1>
                    <span>Compila tu libreria</span>
                    <BeyondButton className="primary small" onClick={this.handleSubmit}>
                        Compilar
                    </BeyondButton>
                </section>
                <BeyondScrollContainer className="build-detail">
                    <span>Compilacion</span>
                    <Messages builder={library.builder}/>
                    {
                        <BeyondButton className="primary small" onClick={this.navigate}>
                            Contratar BNS
                        </BeyondButton>
                    }
                </BeyondScrollContainer>
            </div>
        );
    }

}
