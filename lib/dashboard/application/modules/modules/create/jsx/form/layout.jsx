function FormLayout({state, setState, handleChange}) {
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
            <div className="item">
                <BeyondInput
                    required
                    name="developer"
                    label={texts.form.developer}
                    placeholder={texts.placeholder.developer}
                    value={state.developer}
                    onChange={handleChange}/>
                <span className="help-block">{texts.help.developer}</span>
            </div>
            <BlankFields state={state} setState={setState}/>
        </>);

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
