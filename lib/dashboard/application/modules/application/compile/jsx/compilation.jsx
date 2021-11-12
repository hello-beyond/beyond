class CompilationModal extends React.Component {
    constructor(props) {
        super(props);
        /**
         * when this component is mounted the module is already loaded so, we can
         * access to the module texts without check if it is ready.
         *
         * @type {{showed: number, messages: [], message: {text}, items: number}}
         */
        this.state = {
            messages: [],
            items: 0, showed: 0, message: {
                "text": module.texts.value.compilation.start
            }
        }
        this.container = React.createRef();
        this.updateState = () => this.setState({});
        this.processMessages = this.processMessages.bind(this);
        window._state = this.state;
        window._bulder = this.props.builder;
    }

    /**
     * Trying to add some animation,
     * this code needs to be removed later.
     *
     */
    processMessages() {
        const messages = this.props.builder.messages;
        const total = this.props.builder.messages.length;

        if (total > this.state.showed) {

            const message = messages[this.state.showed + 1];
            if (!message?.text) {
                return;
            }

            window.setTimeout(() => {
                this.container.current.classList.replace('fade-out', 'fade-in');
                window.setTimeout(() => {
                    this.setState((state) => {
                        return {
                            messages: this.state.messages.concat([message.text]),
                            message: message,
                            showed: state.showed + 1
                        }
                    })
                }, 500);
            }, 500);
        }
    }

    componentDidMount() {
        this.processMessages(this.container.current);
        // this.props.builder.on('change', this.updateState);
        this.props.builder.on('change', this.processMessages);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.showed < this.props.builder.messages.length) {
            this.processMessages();
        }
    }

    componentWillUnmount() {
        // this.props.builder.off('change', this.updateState);
        this.props.builder.off('change', this.processMessages);
    }

    render() {
        const {onClose, texts, builder, openPrevious} = this.props;
        const {finished, error, processing} = builder;

        const closeModal = () => {
            builder.clean();
            onClose();
        }
        const onFinish = () => {
            closeModal();
            openPrevious();
        }
        const output = [];
        const footer = [];

        if (!error) output.push(<BeyondSpinner key="spinner" fetching={processing}/>)
        else {
            output.push(
                <BeyondAlert
                    key="error-message" type="error"
                    onClose={builder.cleanError}>
                    {error}
                </BeyondAlert>
            );
            footer.push(
                <footer key="footer-error" className="ds-modal__actions">
                    <BeyondButton onClick={closeModal} className="primary btn-block">
                        {texts.actions.close}
                    </BeyondButton>
                </footer>
            );
        }

        const cls = finished || error ? 'compilation__message hidden' : 'compilation__message ';

        return (
            <BeyondModal show className="md ds-modal ds-modal-compilation" onClose={closeModal}>
                <header className="ds-modal_header">
                    <section>
                        <h4>{texts.compilation.title}</h4>
                        <h5 className="primary-color">
                            {texts.compilation.subtitle}
                        </h5>
                    </section>
                </header>

                <div className="ds-modal__content">
                    {output}
                    {finished &&
                    <FadeIn>
                        <BeyondAlert onClose={builder.cleanError} type="success">
                            {texts.compilation.finished}
                        </BeyondAlert>
                        <footer className="ds-modal__actions">
                            <BeyondButton onClick={onFinish} className="primary btn-block">
                                {texts.actions.close}
                            </BeyondButton>
                        </footer>
                    </FadeIn>
                    }
                    <FadeIn>
                        <div className={cls} ref={this.container}>
                            {this.state.message.text}
                        </div>
                    </FadeIn>
                    {footer}
                </div>
            </BeyondModal>
        )
    }
}