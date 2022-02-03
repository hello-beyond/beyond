function Header() {
    const {model, texts, application,} = useModuleContext();
    const {workspace} = useDSWorkspaceContext();

    const {am} = model;
    const link = am.route ? `${application.application.url}${am.route.toLowerCase()}` : '';
    const changeProperty = event => {
        const target = event.currentTarget;
        am.saveField(target.name, target.checked);
    };
    const open = event => {
        event.preventDefault();
        workspace.openNavigator(application.id, link);
    };

    return (
        <header className="am__header">
            <div className="flex-container">
                <span>{texts.labels.bundles}:</span>
                <BundlesTags/>
                <BeyondSwitch
                    onChange={changeProperty}
                    name="hmr"
                    className="small"
                    value={am.hmr}
                />
                <label>{texts.hmr}</label>
            </div>

            <div className="col col-auto">
                <span className="primary-accent"><strong>{texts.path}</strong> {am.module?.path}</span>
                <div className="primary-accent">id: {am.id}</div>

                {am.route &&
                    <a onClick={open} target="_blank" className="link primary-color lower">{link}</a>}
            </div>

        </header>
    )
}
