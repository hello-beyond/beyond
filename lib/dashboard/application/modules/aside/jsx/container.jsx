export function WorspaceAside() {
    const {panels, workspace} = useDSWorkspaceContext();
    const {aside} = workspace;
    /**
     * @var panel {string} Represents the aside panel, is the control name.
     */
    const defaultAside = routing.uri.qs.has('aside') ? routing.uri.qs.get('aside') : false;

    const [state, setState] = React.useState({panel: defaultAside});
    let cls = `ds__aside ${state?.panel ? '' : 'hide-detail'}`;
    const ref = React.useRef(null);

    useBinder([aside], () => setState(state => ({
        ...state,
        panel: aside.panel,
        application: workspace?.application,
        moduleManager: workspace?.application?.moduleManager,
        modules: workspace?.application?.modules
    })));
    const changeCls = () => {
        ref.current.closest('.ds-application-view-layout').classList.toggle('aside-hidden');
        ref.current.classList.toggle('hide-detail');
    }

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
            panel: controller?.aside,
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
                <PreAside changeCls={changeCls}/>
                <Aside/>
            </aside>
        </DSAsideContext.Provider>
    );
}

// function useController(Controller) {
//
//     const [state, setState] = React.useState({});
//
//     React.useEffect(() => {
//         const control = new Controller();
//         useBinder([control], () => setState({
//             ...state,
//             controller: control,
//             ready: controller.ready
//         }));
//
//     }, []);
//     return [state.ready, state.controller];
// }
