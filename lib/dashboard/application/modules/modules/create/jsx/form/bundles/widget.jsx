function FormWidget({state, handleChange}) {
    const {bundle, model, texts} = useCreateModuleContext();
    if (bundle !== 'widget') return null;

    const inputsAttrs = {};
    if (model.fetching) inputsAttrs.disabled = true;

    const fields = <BlankFields state={state}/>;

    return (
        <>
            <div className="item two-columns">
                <div>
                    <BeyondInput
                        required
                        name="name"
                        {...inputsAttrs}
                        label={texts.form.name}
                        placeholder={texts.placeholder.name}
                        value={state.name}
                        onChange={handleChange}/>
                    <span className="help-block">{texts.help.name}</span>
                </div>
                <div>
                    <BeyondInput
                        name="element"
                        {...inputsAttrs}
                        label={texts.form.webcomponent}
                        placeholder={texts.placeholder.webcomponent}
                        value={state.element}
                        onChange={handleChange}/>
                    <span className="help-block">{texts.help.webcomponent}</span>
                </div>
                <AdditionalProcessors state={state}/>
            </div>
            <AdditionalFields children={fields}/>
            <FormFooter/>
        </>
    )
}
