const CompilerContext = React.createContext();
const useCompilerContext = () => React.useContext(CompilerContext)

class View extends React.Component {

    constructor(props) {
        super(props);
        const {service} = props;
        this.state = {};
        this.update = () => {
            this.setState({});
        };

        this.service = service
        window.s = service;
        this.onSelectEnvironment = this.onSelectEnvironment.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.compile = this.compile.bind(this);
        this.onClose = this.onClose.bind(this);

    }

    componentDidMount() {
        this.props.texts.bind('change', this.update);
        this.props.service.bind('change', this.update);
    }

    componentWillUnmount() {
        this.props.texts.unbind('change', this.update);
        this.props.service.unbind('change', this.update);
    }

    compile(event) {
        event.preventDefault();
        event.stopPropagation();
        const {service} = this;

        this.setState({showCompilation: true});
        service.builder.build({environment: 'development'});

    }

    onSelectEnvironment(event) {
        const target = event.currentTarget;
        const {environment} = target.dataset;
        target.closest('.block-options')
            .querySelectorAll('.active')
            .forEach(item => item.classList.remove('active'));
        target.classList.toggle('active');
        this.setState({environment: environment});
    }

    changeValue(event) {
        const target = event.currentTarget;
        const {property} = target.dataset;
        const value = {};
        value[property] = undefined;
        this.setState(value);
    }

    onClose() {
        this.setState({showCompilation: undefined});
    }

    render() {

        let {texts, service} = this.props;

        if (!texts.ready) return null;

        if (!service.loaded || !service?.builder?.builds) return null;
        texts = texts.value;

        const items = [
            ['Home', '/'],
            ['App', `/services/compile?id=${service.id}`]
        ];

        const {environment} = this.state;
        const isValid = environment;
        const value = {
            texts: texts,
            ready: service.loaded,
            ...this.state,
            builder: service.builder,
            onSelectEnvironment: this.onSelectEnvironment,
            changeValue: this.changeValue,
            isValid: isValid,
            previousOpened: this.state.openPrevious,
        };

        return (
            <div>
                <CompilerContext.Provider value={value}>
                    <DsHeaderBar className="service-header">
                        <div className="left-col">
                            <div className="title-col">
                                <DsBreadcrumb items={items}/>
                                <h2 className="title primary-color">{service.name}</h2>
                            </div>
                        </div>
                    </DsHeaderBar>
                    <div className="ds-container app-service-compile-page">
                        <main>
                            <header>
                                <h4>{texts.title}</h4>
                                <h5>{texts.subtitle}</h5>
                            </header>
                            <PreviousCompilations open={this.state.openPrevious}/>
                            <div className="panels">
                                <div className="form-container">
                                    <Environment/>
                                </div>
                            </div>
                            <hr/>
                            {
                                isValid &&
                                <footer className="center-block">
                                    <BeyondButton
                                        onClick={this.compile}
                                        className="primary btn-block"> {texts.actions.compile}</BeyondButton>
                                </footer>
                            }
                        </main>
                    </div>
                </CompilerContext.Provider>
                {
                    this.state.showCompilation &&
                    <CompilationModal
                        builder={service.builder}
                        onClose={this.onClose}
                        openPrevious={this.togglePrevious}
                        texts={texts}/>
                }
            </div>

        );

    }

}

View.contextType = CompilerContext;