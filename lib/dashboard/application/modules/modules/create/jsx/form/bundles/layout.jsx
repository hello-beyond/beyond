function FormLayout({state, handleChange}) {
    const {bundle, model, texts} = useCreateModuleContext();
    if (bundle !== 'layout') return null;

    const inputsAttrs = {};
    if (model.fetching) inputsAttrs.disabled = true;

    const fields = (
        <>
            <div className="item two-columns">
                <div>
                    <BeyondInput
                        name="title"
                        {...inputsAttrs}
                        label={texts.form.title}
                        placeholder={texts.placeholder.title}
                        value={state.title}
                        onChange={handleChange}/>
                    <span className="help-block">{texts.help.title}</span>
                </div>
                <div>
                    <BeyondInput
                        name="description"
                        {...inputsAttrs}
                        label={texts.form.description}
                        placeholder={texts.placeholder.description}
                        value={state.description}
                        onChange={handleChange}/>
                    <span className="help-block">{texts.help.description}</span>
                </div>
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
