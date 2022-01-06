class View extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            'library': this.props.library,
            'actions': props.actions,
            'texts': props.texts.value,
            'ready': props.texts.ready
        };

        this.update = () => this.setState({
            'ready': props.texts.ready,
            'texts': props.texts.value
        });

    }

    componentDidMount() {
        this.props.library.bind('change', this.update);
        this.props.texts.bind('change', this.update);
    }

    componentWillUnmount() {
        this.props.texts.unbind('change', this.update);
    }

    render() {

        const {library, actions, ready, texts} = this.state;

        if (!library.loaded || !ready) return null;

        return (
            <ListModules texts={texts} library={library} actions={actions}/>
        );

    }

}
