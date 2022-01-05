function FormLayout({state, handleChange}) {
    const {bundle, texts} = useCreateModuleContext();
    if (bundle !== 'layout') return null;

    const fields = (
        <>
            <div className="item two-columns">
                <div>
                    <BeyondInput
                        name="title"
                        label={texts.form.title}
                        placeholder={texts.placeholder.title}
                        value={state.title}
                        onChange={handleChange}/>
                    <span className="help-block">{texts.help.title}</span>
                </div>
                <div>
                    <BeyondInput
                        name="description"
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
                        label={texts.form.name}
                        placeholder={texts.placeholder.name}
                        value={state.name}
                        onChange={handleChange}/>
                    <span className="help-block">{texts.help.name}</span>
                </div>
                <div>
                    <BeyondInput
                        name="element"
                        label={texts.form.webcomponent}
                        placeholder={texts.placeholder.webcomponent}
                        value={state.element}
                        onChange={handleChange}/>
                    <span className="help-block">{texts.help.webcomponent}</span>
                </div>

            </div>
            <AdditionalFields children={fields}/>
            <FormFooter/>
        </>
    )
}
