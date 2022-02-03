export function ConfigBoard() {

    const [state, setState] = React.useState({});
    const [controller, setController] = React.useState();
    const {fetching, update} = state;
    const [active, setActive] = React.useState('general');
    const tabs = {
        general: EditorSettings,
        apps: ApplicationsSettings
    }
    React.useEffect(() => {
        const controller = new Controller();
        setController(controller);
        setState(state => ({...state, controller, update: performance.now()}));
        const onChange = () => setState({...state, update: performance.now()});
        controller.bind('change', onChange);
        return () => controller.unbind('change', onChange);
    }, []);

    if (!update || !controller?.ready) return null;
    const {editorSettings, texts} = controller;
    const {unpublished} = editorSettings;
    const Control = tabs[active];

    return (
        <ConfigContext.Provider value={{editorSettings, active, unpublished, texts, tabs, setActive}}>
            <div className="workspace__board">
                <Tabs/>
                <Control/>
            </div>
        </ConfigContext.Provider>

    )
}
