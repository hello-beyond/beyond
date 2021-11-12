const ModuleContext = React.createContext();
const useModuleContext = () => React.useContext(ModuleContext);

export function ModuleBoard(props) {
    const {specs} = props;
    let {workspace: {application}, navigateModule, panel} = useDSWorkspaceContext();
    const {moduleManager} = application;

    const [model, setModel] = React.useState(moduleManager.active);
    const [ready, setReady] = React.useState(module.texts?.ready);
    useBinder([module.texts], () => setReady(module.texts.ready));
    React.useEffect(() => {
        (async () => {
            if ([undefined, null].includes(specs?.moduleId)) return;
            const model = await moduleManager.load(specs.moduleId);
            panel.setTabName(specs.moduleId, model.name);
            setModel(model);
        })();
    }, [specs.moduleId]);

    if (!specs.moduleId && !moduleManager.active || !ready) return null;

    const texts = module.texts.value;
    if (!moduleManager.active?.module?.found && !moduleManager.active.module?.fetching) {
        return <h2>Modulo no conseguido</h2>
    }
    return (

        <ModuleContext.Provider value={{model, application, texts, navigateModule}}>
            <div className="ds-module-view__detail">
                <Header/>
                <div className="module__alerts-section">
                    <GeneralAlerts/>
                    <Diagnostics/>
                </div>
                <Description/>
            </div>
        </ModuleContext.Provider>
    );
}
