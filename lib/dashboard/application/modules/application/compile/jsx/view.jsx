const CompilerContext = React.createContext();
const useCompilerContext = () => React.useContext(CompilerContext)

export function CompileBoard() {

    const {workspace: {application}} = useDSWorkspaceContext();
    const [state, setState] = React.useState({});
    React.useEffect(() => {
        const onChange = () => {
            setState({...state, texts: module.texts.value, ready: module.texts.ready});
        };
        module.texts.bind('change', onChange);
        return () => module.texts.unbind('change', onChange);

    }, []);

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

    if (!state.ready) return <DsFetchingBlock/>;
    const {texts} = state;
    const {environment, platform, os} = state;
    const isValid = environment && platform && (platform === 'web' || !!os);
    const value = {
        texts: texts,
        application: application,
        builder: application.builder,
        ready: ready,
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
                <DsHeaderBar>
                    <div className="left-col">
                        <div className="title-col">
                            <DsBreadcrumb items={items}/>
                            <h2 className="title primary-color">{application.name}</h2>
                        </div>
                    </div>
                </DsHeaderBar>
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

