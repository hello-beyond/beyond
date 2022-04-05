export function DSWorkspace({workspace}) {
    // TODO: @julio the navigator must be a board

    const [state, setState] = React.useState({});

    const [showModal, setShowModal] = React.useState(false);
    const [ready, setReady] = React.useState(false);
    const navigateModule = route => setState({navigator: route, openNavigator: true});
    const showProjectForm = () => setShowModal(true);

    useBinder([workspace], () => setState({ready: workspace.ready, ...workspace.state}));
    React.useEffect(() => {
        DSPreAside.addToTop("applications", {
            icon: 'apps', title: 'Aplicaciones',
            tippy: {placement: 'right'},
            action: () => workspace.openBoard('applications')
        });
        DSPreAside.addItems('bottom', {
            newProject: {
                action: showProjectForm,
                icon: 'newProject', title: 'New Project', tippy: {
                    placement: 'right'
                }
            },
            settings: {
                action: navigateModule,
                icon: 'setting', title: 'Configuración', tippy: {
                    placement: 'right'
                }
            }
        });
    }, []);

    if (!workspace.ready || !ready) {
        return <PreloadWelcome setReady={setReady} workspace={workspace}/>
    }

    // if (!workspace.user.hasAccess) {
    //     return <DeveloperForm texts={workspace.texts} workspace={workspace}/>;
    // }
    const {texts, applications, active, panels} = workspace;

    const value = {
        workspace, texts, applications, navigateModule, active, panels,
        ready: state.ready,
        panel: panels.active,
        showProjectForm,
        showModuleForm: () => setState({addModule: true})
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
            {showModal && <ApplicationCreate closeModal={() => setShowModal(false)}/>}
            {state.addModule &&
                <CreateModuleForm workspace={workspace} onClose={() => workspace.setState({addModule: false})}/>
            }
        </>
    );
}