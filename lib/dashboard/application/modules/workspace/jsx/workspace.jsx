export function DSWorkspace({workspace}) {
    // TODO: @julio the navigator must be a board

    const [state, setState] = React.useState({});

    const [showModal, setShowModal] = React.useState(false);
    const [ready, setReady] = React.useState(false);
    const navigateModule = route => setState({navigator: route, openNavigator: true});

    useBinder([workspace], () => setState({ready: workspace.ready, ...workspace.state}));
    React.useEffect(() => {
        DSPreAside.addToTop("applications", {
            icon: 'apps', title: 'Aplicaciones',
            tippy: {placement: 'right'},
            action: () => workspace.openBoard('applications')
        });
        DSPreAside.addToBottom('settings', {
            action: (name, params) => workspace.openBoard(name, params),
            icon: 'setting', title: 'Configuración', tippy: {
                placement: 'right'
            }
        })
    }, []);

    if (!workspace.ready || !ready) {
        return <PreloadWelcome setReady={setReady} workspace={workspace}/>
    }

    if (!workspace.hasPermission) {
        return <DeveloperForm texts={workspace.texts} workspace={workspace}/>;
    }
    const {texts, applications, active, panels} = workspace;

    let value = {
        ready: state.ready,
        workspace, texts, applications, navigateModule, active, panels,
        showAppForm: () => setShowModal(true),
        showModuleForm: () => setState({addModule: true}),
        panel: panels.active
    };

    return (
        <>
            <DSWorkspaceContext.Provider value={value}>
                <div className="ds-application-view-layout">
                    <Toolbar/>
                    <AppErrors/>
                    <WorspaceAside/>
                    <div className="ds__main-container">
                        <Panels/>
                    </div>
                    <FooterBar/>
                </div>
            </DSWorkspaceContext.Provider>
            {showModal && <ApplicationCreate closeModal={() => {
                setShowModal(false)
            }}/>}
            {state.addModule &&
             <CreateModuleForm
                 workspace={workspace}
                 onClose={() => {
                     workspace.setState({addModule: false})
                 }}/>}
        </>
    );
}
