const DSApplicationsContext = React.createContext();
const useDSApplicationsContext = () => React.useContext(DSApplicationsContext);

export function ApplicationsBoard() {

    const [state, setState] = React.useState({
        controller: AppsController,
        ready: AppsController.ready
    });

    const {showAppForm, applications} = useDSWorkspaceContext();
    React.useEffect(() => {

        AppsController.setApplications(applications);
        const onChange = () => {
            setState(state => ({
                ...state,
                controller: AppsController,
                items: applications.items,
                ready: AppsController.ready,
                timeUpdated: performance.now()
            }));

        };
        AppsController.bind('change', onChange);
        onChange();
        return () => AppsController.unbind('change', onChange);
    }, []);

    if (!state.ready || !applications.fetched) return <PreloadCollection/>
    const {texts} = state.controller;

    const headerTexts = texts.header;
    let apps = applications.items.map(item => <ApplicationItem texts={texts} key={item.id} item={item}/>);
    if (!applications.items.length) apps = <Empty/>;
    return (
        <DSApplicationsContext.Provider value={{texts, timeUpdated: state.timeUpdated, creteApp: showAppForm}}>
            <main className="ds-applications-board">
                <header className="list_header">
                    <h4>{headerTexts.title}</h4>
                    <div className="actions">
                        <div className="link" onClick={showAppForm}>{texts.actions.create}</div>
                        <span>{applications.items.length} {headerTexts.title}</span>
                    </div>
                </header>
                {apps}
            </main>
        </DSApplicationsContext.Provider>
    );
}
