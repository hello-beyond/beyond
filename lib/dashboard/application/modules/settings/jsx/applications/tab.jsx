const AppsSettingsContext = React.createContext();
const useAppsSettingsContext = () => React.useContext(AppsSettingsContext);

function ApplicationsTab() {
    const {texts} = useConfigContext();
    const {workspace} = useDSWorkspaceContext();
    const [selected, setSelected] = React.useState(workspace?.application)
    const [fetching, setFetching] = React.useState();

    return (
        <AppsSettingsContext.Provider value={{
            fetching,
            setFetching,
            selected,
            setSelected,
            texts
        }}>
            <ApplicationsSelect/>
            {selected && <ListDistributions texts={texts.distribution}/>}
        </AppsSettingsContext.Provider>

    )
}
