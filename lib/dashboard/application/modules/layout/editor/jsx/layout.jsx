class Control extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.docs = props.docs;
        this.container = React.createRef();
        this.scroll = React.createRef();
        this.props.parent.bind('change', () => this.setState({}));
        this.update = () => this.setState({});
        this.openDoc = this.openDoc.bind(this);
        this.onScroll = this.onScroll.bind(this);

    }

    onScroll(e, target, ps) {
        if (!ps?.reach?.y) {
            e.currentTarget.classList.add('sticky');
            return;
        }
        if (ps?.reach?.y === 'start') {
            e.currentTarget.classList.remove('sticky');
        }
    }

    componentDidMount() {
        this.props.parent.rendered();
        this.docs.bind('change', this.update);
    }

    openDoc(doc) {
        this.setState({openDoc: true, doc: doc});
    }

    componentWillUnmount() {
        this.docs.unbind('change', this.update);
        this.scroll.current.removeEventListener('ps-scroll-y', this.onScroll);
    }

    render() {

        return (
            <>
                <div className="dashboard-layout" ref={this.container}/>

                {
                    this.docs.showing &&
                    <Documentation doc={this.docs.current} onClose={this.docs.clean}/>}
            </>
        );
    }

}
