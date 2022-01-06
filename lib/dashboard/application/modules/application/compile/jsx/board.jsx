const CompilerContext = React.createContext();
const useCompilerContext = () => React.useContext(CompilerContext)

export function CompileBoard(props) {

    const [state, setState] = React.useState({});
    const [ready, setReady] = React.useState(controller.ready);
    useBinder([controller], () => setReady(controller.ready));

    React.useEffect(() => {

        if (props.specs.id) controller.getApp([props.specs.id]);
        setReady(controller.ready);
    }, [props.specs]);
    if (!ready) return <DsFetchingBlock/>;
    const {texts, application, error} = controller;

    const onSelectEnvironment = (event) => {
        const target = event.currentTarget;
        const {environment} = target.dataset;
        target.closest('.block-options').querySelectorAll('.active').forEach(item => item.classList.remove('active'));
        target.classList.toggle('active');
        setState({environment: environment});
    };

    function onPlatformSelect(event) {
        const target = event.currentTarget;
        const {value} = target.dataset;

        target.closest('.block-options').querySelectorAll('.active').forEach(item => item.classList.remove('active'));
        target.classList.toggle('active');
        const state = {platform: value};
        if (value === 'web') state.os = false;
        setState(state);
    }

    function onOSSelect(event) {
        const target = event.currentTarget;
        const {value} = target.dataset;

        target.closest('.block-options').querySelectorAll('.active').forEach(item => item.classList.remove('active'));
        target.classList.toggle('active');
        setState({os: value});
    }

    function changeValue(event) {
        const target = event.currentTarget;
        const {property} = target.dataset;
        const value = {};
        value[property] = undefined;
        setState(value);
    }

    function setSwitch(event) {
        const target = event.currentTarget;
        const value = {};
        value[target.name] = target.checked;
        setState({...state, value})
    }

    const togglePrevious = () => setState((state) => ({...state, openPrevious: !state.openPrevious}));

    function compile(event) {
        event.preventDefault();
        event.stopPropagation();

        setState({...state, showCompilation: true});
        const specs = {
            environment: state.environment,
            platform: state.platform === 'web' ? 'web' : state.os,
            ssr: true,
            compress: state.compress,
            icons: state.icons
        };

        application.builder.build(specs);
    }

    function onClose() {
        setState({...state, showCompilation: undefined});
    }

    const {environment, platform, os} = state;
    const isValid = environment && platform && (platform === 'web' || !!os);
    const value = {
        texts: texts,
        application,
        builder: application.builder,
        ready,
        ...state,
        onSelectEnvironment: onSelectEnvironment,
        onPlatformSelect: onPlatformSelect,
        onOSSelect: onOSSelect,
        changeValue: changeValue,
        isValid: isValid,
        previousOpened: state.openPrevious,
        togglePrevious: togglePrevious
    };

    return (
        <div>
            <CompilerContext.Provider value={value}>

                <div className="ds-container app-application-compile-page">
                    <main>
                        <header>
                            <h4>{texts.title}</h4>
                            <h5>{texts.subtitle}</h5>
                        </header>
                        <PreviousCompilations open={state.openPrevious}/>
                        <div className="panels">
                            <div className="form-container">
                                <Environment/>
                                <Platform/>
                                <OsFields/>
                            </div>
                        </div>
                        <hr/>
                        {isValid &&
                         <>
                             <div className="column__right-content">
                                 <div className="flex-column">
                                     <BeyondSwitch name="compress" value={true} onChange={setSwitch}/>
                                     <label>{texts.compress}</label>
                                 </div>
                             </div>
                             <hr/>
                             <footer className="center-block">
                                 <BeyondButton onClick={compile} className="primary btn-block">
                                     {texts.actions.compile}
                                 </BeyondButton>
                             </footer>
                         </>
                        }
                    </main>
                </div>
            </CompilerContext.Provider>
            {state.showCompilation &&
             <CompilationModal
                 texts={texts}
                 onClose={onClose}
                 builder={application.builder}
                 openPrevious={togglePrevious}/>
            }
        </div>
    );
}

