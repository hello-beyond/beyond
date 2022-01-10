function Header() {
    const {model, texts, application, navigateModule} = useModuleContext();

    const {am} = model;
    const link = am.route ? `${application.application.url}${am.route.toLowerCase()}` : '';
    const changeProperty = event => {
        const target = event.currentTarget;
        am.saveField(target.name, target.checked);
    };
    const open = event => {
        event.preventDefault();
        navigateModule({
            url: link,
            route: am.route
        });
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
            <div className="mt-15 flex-container flex-space">
                <div className="col">
                    <span className="primary-accent"><strong>{texts.path}</strong> {am.module?.path}</span>
                </div>
                <div className="col">
                    {am.route &&
                     <a onClick={open} target="_blank" className="link primary-color lower">{link}</a>}
                </div>
            </div>
        </header>
    )
}
