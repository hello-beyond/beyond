class View extends React.Component {

    constructor(props) {

        super(props);
        this.state = {};
        this.update = () => this.setState({});

    }

    componentDidMount() {
        this.props.library.bind('change', this.update);
    }

    componentWillUnmount() {
        this.props.library.unbind('change', this.update);
    }

    render() {

        const library = this.props.library;
        if (!library.loaded) return null;

        return (
            <div>
                <div className="modules-content-lib">
                    <div className="logo"/>
                    <h2>Library name: <strong>{library.name}</strong></h2>
                    <Modules modules={library.modules}/>
                </div>
            </div>);

    }

}
