class Notify extends React.Component {
    constructor(props) {
        super(props);
        this.notify = NotifyManager;
        this.update = () => this.context.add(this.notify.value);
    }

    componentDidMount() {
        this.notify.bind('change', this.update);
    }

    componentWillUnmount() {
        this.notify.bind('change', this.update);
    }

    render() {
        return null;
    }
}

Notify.contextType = ToastContext;