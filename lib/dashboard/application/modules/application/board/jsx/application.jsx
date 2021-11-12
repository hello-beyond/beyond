export function ApplicationBoard(props) {

    const [displayView, setDisplayView] = React.useState(localStorage.getItem('beyond.lists.view') ?? 'table');
    const [state, setState] = React.useState({});
    const {panel, workspace, workspace: {application}} = useDSWorkspaceContext();

    React.useEffect(() => {
        const {id, moduleId} = props?.specs ?? {};

        if (!id) return;
        const controller = new Controller(workspace, id, moduleId);
        const onChange = () => {
            setState({
                ...state,
                controller,
                ready: controller.ready,
                texts: controller.texts,
                application: controller.application
            })
            if (controller.ready) {
                let {application: {application}} = controller;
                panel.setTabName(`app.${application.id}`, application.name);
            }
        }

        controller.bind('change', onChange);
        if (controller.ready) onChange();
        return () => {
            controller.unbind('change', onChange);
        }
    }, [props.specs?.id]);
    if (!state.ready) return <Preloader/>;
    const {controller} = state;
    return (
        <AppContext.Provider value={{
            application,
            texts: state.texts,
            displayView
        }}>
            <div>
                <ApplicationConfig/>
                <Header displayView={displayView} setDisplayView={setDisplayView}/>
                <ModulesList displayView={displayView} setDisplayView={setDisplayView}/>
            </div>
        </AppContext.Provider>
    )
}
