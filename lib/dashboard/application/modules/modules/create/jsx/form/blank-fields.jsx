function BlankFields({state}) {
    const {model, origin, texts} = useCreateModuleContext();
    /**
     * Use by multilanguage and server fields
     * @param event
     */
    const toggleRadio = event => {
        const target = event.currentTarget;
        const newValue = {};
        newValue[target.name] = target.checked;

        model.bundle.set(target.name, target.checked);
    }

    if (origin === 'templates') return null;

    return (

        <div className="item item_switch flex-container">
            <div className="switch-option">
                <BeyondSwitch name="styles" value={state.styles} onChange={toggleRadio}/>
                <label>{texts.form.styles}</label>
                <DsIconButton icon="info" className="gray circle" title={texts.help.titles.styles}/>
            </div>
            <div className="switch-option">
                <BeyondSwitch name="multilanguage" value={state.multilanguage} onChange={toggleRadio}/>
                <label>{texts.form.multilanguage}</label>
                <DsIconButton icon="info" className="gray circle" title={texts.help.titles.text}/>
            </div>
            <div className="switch-option">
                <BeyondSwitch name="server" value={state.server} onChange={toggleRadio}/>
                <label>{texts.form.server}</label>
                <DsIconButton icon="info" className="gray circle" title={texts.help.titles.server}/>
            </div>
        </div>

    )
}
