function FormBridge({state, handleChange}) {
    const {bundle, model, texts} = useCreateModuleContext();
    if (bundle !== 'bridge') return null;

    const fields = <BlankFields state={state}/>;
    const inputsAttrs = {};
    if (model.fetching) inputsAttrs.disabled = true;

    return (
        <>
            <div className="item">
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
            <AdditionalFields children={fields}/>
            <FormFooter/>
        </>
    )
}