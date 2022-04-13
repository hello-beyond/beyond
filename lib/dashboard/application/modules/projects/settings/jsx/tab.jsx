const AppsSettingsContext = React.createContext();
const useAppsSettingsContext = () => React.useContext(AppsSettingsContext);

export /*bundle**/
function ApplicationsSettings() {

    const {workspace} = useDSWorkspaceContext();
    const [ready, setReady] = React.useState(controller.ready);
    useBinder([controller], () => setReady(controller.ready));
    const [selected, setSelected] = React.useState(workspace?.application)
    const [fetching, setFetching] = React.useState();
    if (!ready) return null;
    const {texts} = controller;
    return (
        <AppsSettingsContext.Provider value={{
            fetching,
            setFetching,
            selected,
            setSelected,
            texts
        }}>
            <ApplicationsSelect/>
            {selected && <AppDistributions texts={texts.distribution} application={selected}/>}
        </AppsSettingsContext.Provider>

    )
}
