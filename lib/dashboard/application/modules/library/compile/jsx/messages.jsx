class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.update = () => this.setState({});
    }

    componentDidMount() {
        this.props.builder.bind('change', this.update);
    }

    componentWillUnmount() {
        this.props.builder.unbind('change', this.update);
    }

    render() {

        const messages = this.props.builder.messages;
        const output = [];

        messages.map(message => output.push(
            <div key={message.id} className={message.is}>{message.id} - {message.text}</div>)
        );

        return <div className="item">{output}</div>;

    }

}
