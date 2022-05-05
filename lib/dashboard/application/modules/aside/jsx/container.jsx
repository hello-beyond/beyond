export function WorspaceAside() {
    const {panels, workspace} = useDSWorkspaceContext();
    const {aside} = workspace;
    /**
     * @var panel {string} Represents the aside panel, is the control name.
     */


    const [state, setState] = React.useState({panel: aside.panel});

    let cls = `ds__aside ${state?.panel ? '' : 'hide-detail'}`;
    const ref = React.useRef(null);

    useBinder([aside], () => setState(state => ({
        ...state,
        panel: aside.panel,
        application: workspace?.application,
        moduleManager: workspace?.application?.moduleManager,
        modules: workspace?.application?.modules
    })));

    React.useEffect(() => {
        const controller = new Controller(workspace);

        const onChange = () => setState({
            ...state,
            controller,
            modules: controller?.modules,
            application: workspace?.application,
            texts: controller?.texts,
            ready: controller?.ready,
            setActiveAside: workspace.aside.setActive,
            panel: aside.panel,
            moduleManager: workspace?.application?.moduleManager
        });

        onChange();
        controller.bind('change', onChange)
        return () => controller.unbind('change', onChange);
    }, []);

    if (!state.ready) return <AsidePreload/>;

    return (
        <DSAsideContext.Provider value={{...state, panels}}>
            <aside className={cls} ref={ref}>
                <PreAside/>
                <Aside/>
            </aside>
        </DSAsideContext.Provider>
    );
}

