function FormBridge({state, handleChange}) {
    const {bundle, texts} = useCreateModuleContext();
    if (bundle !== 'bridge') return null;

    const fields = <BlankFields state={state}/>;

    return (
        <>
            <div className="item">
                <BeyondInput
                    required
                    name="name"
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
