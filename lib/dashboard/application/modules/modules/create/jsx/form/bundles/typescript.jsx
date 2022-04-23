function FormTypescript({state, disabled, handleChange}) {
    const {bundle, model, texts} = useCreateModuleContext();
    if (bundle !== 'ts') return null;

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
                    {...disabled}
                    label={texts.form.name}
                    placeholder={texts.placeholder.name}
                    value={state.name}
                    onChange={handleChange}/>
                <span className="help-block">{texts.help.name}</span>
            </div>
            <AdditionalFields disabled={disabled} children={fields}/>
            <FormFooter disabled={disabled}/>
        </>
    )
}
