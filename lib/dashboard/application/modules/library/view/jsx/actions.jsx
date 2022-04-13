class ApplicationActions extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {logged: auth.valid};
        this.updateUser = this.updateUser.bind(this);
        this.modal = modal => this.props.actions.addRefs({modal: modal});
        this.loginModal = modal => this.props.actions.addRefs({modal: modal});
    }

    componentDidMount() {
        auth.bind('login', this.updateUser)
    }

    componentWillUnmount() {
        auth.unbind('login', this.updateUser)
    }

    async updateUser() {
        const user = await auth.localSession.user;
        this.setState({user: user, logged: auth.valid});
    }
    process() {

    }

    render() {

        const {library, texts, actions, application} = this.props;

        const {user, logged} = this.state;
        const action = application.running ? "Play" : "Stop";

        return (
            <article className="actions-container">
                <section>
                    <DashboardIconButton
                        className="primary app-library-views-btn"
                        onClick={this.process}
                        title={action}
                        name={action}/>
                    <UploadButton
                        className="primary btn-action"
                        type="library"
                        path={library.path}/>
                </section>
                <section className="text-right">
                    <DashboardIconButton
                        className="primary btn-action"
                        title={texts.actions.publish}
                        icon="upload"
                        name="upload"
                        onClick={actions.publish}/>
                    {
                        library.connect &&
                        <BeyondButton
                            className="primary small details"
                            onClick={() => actions.compile('client', library)}>
                            <div>
                                <DashboardIcon icon="settings"/>
                                {texts.actions.compile}
                            </div>
                        </BeyondButton>
                    }
                </section>
                {logged ?
                    <PublishModal ref={this.modal} application={application} actions={actions} user={user}/> :
                    <AuthLogin ref={this.loginModal}/>}
            </article>
        );

    }

}
