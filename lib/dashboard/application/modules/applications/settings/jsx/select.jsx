function ApplicationsSelect() {

    const {setSelected, setFetching, texts, selected, fetching} = useAppsSettingsContext();
    const {workspace, workspace: {applications: {items}}} = useDSWorkspaceContext();
    const handleChange = async ele => {
        setFetching(true);
        const application = await workspace.getApplication(ele.value);
        setSelected(application)
        setFetching(false);
    };
    const options = items.map(item => ({value: item.id.toString(), label: item.name}));

    const cls = `flex__column${fetching ? ' is-fetching' : ''}`
    return (
        <div className={cls}>
            <label>{texts.applications.select}</label>
            <div className="relative__container">
                <DSSelect options={options} value={selected?.id} onSelect={handleChange}/>
                {fetching && <BeyondSpinner active className="primary"/>}
            </div>

        </div>
    )
}
