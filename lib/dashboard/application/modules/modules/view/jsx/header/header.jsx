function Header() {
    const {model, texts, application, navigateModule} = useModuleContext();

    const {module} = model;
    const link = module.route ? `${application.application.url}${module.route.toLowerCase()}` : '';
    const changeProperty = event => {
        const target = event.currentTarget;
        module.saveField(target.name, target.checked);
    };
    const open = event => {
        event.preventDefault();
        navigateModule({
            url: link,
            route: module.route
        });
    };

    return (
        <header className="module__header">
            <div className="flex-container flex-space">
                <div className="flex-container">
                    <ProcessorsTags/>
                    <BeyondSwitch
                        onChange={changeProperty}
                        name="hmr"
                        className="small"
                        value={module.hmr}
                    />
                    <label>{texts.hmr}</label>
                </div>
            </div>
            <div className="mt-15 flex-container flex-space">
                <div className="col">
                    {module.route &&
                     <a onClick={open} target="_blank" className="link primary-color lower">{link}</a>}
                </div>
            </div>
        </header>
    )
}