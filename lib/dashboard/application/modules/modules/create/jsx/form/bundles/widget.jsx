function FormWidget({state, handleChange}) {
    const {bundle, texts} = useCreateModuleContext();
    if (bundle !== 'widget') return null;

    const fields = (
        <>
            <div className="item two-columns">

            </div>
            <BlankFields state={state}/>
        </>
    );

    return (
        <>
            <div className="item two-columns">
                <div>
                    <BeyondInput
                        required
                        name="name"
                        label={texts.form.name}
                        placeholder={texts.placeholder.name}
                        value={state.name}
                        onChange={handleChange}/>
                    <span className="help-block">{texts.help.name}</span>
                </div>
                <div>
                    <BeyondInput
                        required
                        name="developer"
                        label={texts.form.developer}
                        placeholder={texts.placeholder.developer}
                        value={state.developer}
                        onChange={handleChange}/>
                    <span className="help-block">{texts.help.developer}</span>
                </div>
            </div>
            <AdditionalFields children={fields}/>
            <FormFooter/>
        </>
    )
}