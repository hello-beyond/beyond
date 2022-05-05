const ModuleContext = React.createContext();
const useModuleContext = () => React.useContext(ModuleContext);

export function ModuleBoard(props) {
    const {specs} = props;
    let {workspace, navigateModule, panel} = useDSWorkspaceContext();
    const [project, setProject] = React.useState();

    const [model, setModel] = React.useState(moduleManager.active);
    const [ready, setReady] = React.useState(module.texts?.ready);
    useBinder([module.texts], () => setReady(module.texts.ready));

    React.useEffect(() => {

        (async () => {
            const project = await workspace.getProject(specs.projectId);
            setProject(project);
            const module = await workspace.getModuleManager(specs.projectId, specs.moduleId);
            setModel(module);

        })();

    }, [props.projectId]);

    React.useEffect(() => {
        (async () => {
            if ([undefined, null].includes(specs?.moduleId)) return;
            const model = await moduleManager.load(specs.moduleId);
            setModel(model);
            window.module = model;
            panel.setTabName(specs.moduleId, model.name);

        })();
    }, [specs.moduleId]);

    if (!specs.moduleId && !moduleManager.active || !ready || !model?.ready || specs.moduleId !== model.id) {
        return <DSSpinner/>;
    }
    const texts = module.texts.current.value;

    return (
        <ModuleContext.Provider value={{
            model,
            application: project, texts, navigateModule
        }}>
            <div className="ds-module-view__detail">
                <Header/>
                <Description/>
                <Cards/>
                <div className="module__alerts-section">
                    <GeneralAlerts/>
                    <Diagnostics/>
                </div>

                <Consumers/>
                <ListDependencies/>
            </div>
        </ModuleContext.Provider>
    );
}
