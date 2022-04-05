function DetailApp() {
    const {texts: {errors, form: texts, actions}, model, fetching} = useCreateAppContext();

    const [state, setState] = React.useState({});
    const btnAttrs = {};
    const handleName = event => handleChange(event, / /g);
    const inputsAttrs = {};
    if (fetching) inputsAttrs.disabled = true;
    const handleChange = (event, pattern) => {
        const target = event.target;
        let {name, value} = target;
        if (pattern) value = value.replace(pattern, '-');
        model[name] = value;

        setState({...state, ...{[name]: model[name]}});
    };
    const toggleRadio = event => {
        const target = event.currentTarget;
        if (target.name === 'inspectPortSwitch') model.useInspectPort = target.checked;
        else model[target.name] = target.checked;

        setState({...state, ...{useInspectPort: target.checked}});
    };

    if (!model.valid || fetching) btnAttrs.disabled = true;

    return (
        <div className="ds-create-app__fields">
            {(model.error) &&
                <BeyondAlert title={errors.title} type="error">Mensaje de error {errors[model.error]}</BeyondAlert>
            }
            <div className="item">
                <div className="section-group">
                    <BeyondInput
                        {...inputsAttrs}
                        name="scope" label={texts.scope.label}
                        placeholder={texts.scope.label} value={state.scope} onChange={handleName}/>
                    <IconInfo msg={texts.name.info}/>
                </div>
                <div className="section-group">
                    <BeyondInput
                        {...inputsAttrs}
                        name="name" label={texts.name.label}
                        placeholder={texts.name.label} required
                        value={state.name} onChange={handleName}/>
                    <IconInfo msg={texts.name.info}/>
                </div>
                <div className="section-group">
                    <BeyondInput
                        {...inputsAttrs}
                        name="title" label={texts.title.label}
                        placeholder={texts.title.label}
                        value={state.title} onChange={handleChange}/>
                    <IconInfo msg={texts.title.info}/>
                </div>
                <div className="switch-option">
                    <BeyondSwitch name="inspectPortSwitch" value={model.useInspectPort} onChange={toggleRadio}/>
                    <label>Backend?</label>
                </div>

                <div className="flex-container">
                    {model.useNavigatePort && <PortField identifier="navigate" name="navigatePort"/>}
                    {model.useInspectPort && <PortField identifier="inspect" name="inspectPort"/>}
                </div>
                <div className="section-group">
                    <BeyondInput
                        {...inputsAttrs}
                        value={state.description}
                        placeholder={texts.description.label}
                        name="description" label={texts.description.label}
                        onChange={handleChange}/>
                    <IconInfo msg={texts.description.info}/>
                </div>

                <div className="switch-option">
                    <BeyondSwitch name="npm" value={model.npm} onChange={toggleRadio}/>
                    <label>{texts.npm}</label>
                </div>
            </div>
            <footer className="footer ds-modal__actions">
                <div className="actions">
                    <BeyondButton {...btnAttrs} className="btn-large btn primary" type="submit">
                        {fetching
                         ? <BeyondSpinner className="on-primary" fetching={true}/>
                         : actions.submit
                        }
                    </BeyondButton>
                </div>
            </footer>
        </div>
    );
}
