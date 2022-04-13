function BlankFields({state, disabled}) {
    const {bundle, model, origin, texts} = useCreateModuleContext();
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

    const processorStyles = bundle !== 'ts' && bundle !== 'bridge';

    return (

        <div className="item item_switch flex-container">
            {processorStyles &&
                <div className="switch-option">
                    <BeyondSwitch name="styles" {...disabled} checked={state.styles} value={state.styles}
                                  onChange={toggleRadio}/>
                    <label>{texts.form.styles}</label>
                    <DSIconButton icon="info"  {...disabled} className="gray circle" title={texts.help.titles.styles}/>
                </div>
            }
            <div className="switch-option">
                <BeyondSwitch name="multilanguage"
                              {...disabled}
                              value={state.multilanguage} onChange={toggleRadio}/>
                <label>{texts.form.multilanguage}</label>
                <DSIconButton icon="info" {...disabled}
                              className="gray circle" title={texts.help.titles.text}/>
            </div>
        </div>

    )
}
