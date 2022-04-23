function FormPage({state, handleChange, disabled}) {
    const {model, bundle, texts} = useCreateModuleContext();
    if (bundle !== 'page') return null;

    const [route, setRoute] = React.useState('/');
    const handlePage = event => {
        const target = event.currentTarget;
        //TODO: check regexp
        const checked = target.value.match(/\/[\/a-zA-Z0-9-_]*/);
        if (!checked) {
            event.preventDefault();
            return;
        }

        setRoute(checked.join(''));
        handleChange(event);
    }

    const fields = (
        <>
            <FormLayoutSection disabled={disabled} handleChange={handleChange}/>
            <div className="item two-columns">
                <div>
                    <BeyondInput
                        name="title"
                        {...disabled}
                        label={texts.form.title}
                        placeholder={texts.placeholder.title}
                        value={state.title}
                        onChange={handleChange}/>
                    <span className="help-block">{texts.help.title}</span>
                </div>
                <div>
                    <BeyondInput
                        name="description"
                        {...disabled}
                        label={texts.form.description}
                        placeholder={texts.placeholder.description}
                        value={state.description}
                        onChange={handleChange}/>
                    <span className="help-block">{texts.help.description}</span>
                </div>
            </div>
            <BlankFields state={state} setState={handleChange}/>
        </>
    );

    const inputsAttrs = {};
    if (model.fetching) inputsAttrs.disabled = true;

    return (
        <>
            <div className="item two-columns">
                <div>
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
                <div>
                    <BeyondInput
                        {...inputsAttrs}
                        name="element"
                        label={texts.form.webcomponent}
                        placeholder={texts.placeholder.webcomponent}
                        value={state.element}
                        onChange={handleChange}/>
                    <span className="help-block">{texts.help.webcomponent}</span>
                </div>
            </div>
            <div className="item two-columns">
                <div>
                    <BeyondInput
                        {...inputsAttrs}
                        name="route" required value={route} onChange={handlePage}
                        label={texts.form.url} placeholder={texts.placeholder.url}/>
                    <span className="help-block">{texts.help.url}</span>
                </div>
                <div className="item-vdir">
                    <label htmlFor="vdir">Número de parametros de url?</label>
                    <input
                        type="number"
                        defaultValue={model.bundle.vdir}
                        name="vdir" required value={state.vdir}
                        {...inputsAttrs}
                        onChange={handleChange}/>
                </div>
                <AdditionalProcessors state={state}/>
            </div>
            <AdditionalFields children={fields}/>
            <FormFooter/>
        </>
    );
}
