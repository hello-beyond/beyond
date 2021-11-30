function DetailApp({type}) {
    const {texts: {form: texts, actions}, model, fetching} = useCreateAppContext();

    const [firstTime, setFirstTime] = React.useState(true);
    const [state, setState] = React.useState({port: 8080});
    const [validPort, setValidPort] = React.useState(undefined);

    const btnAttrs = {};
    const handleName = event => handleChange(event, true);
    const handleChange = (event, pattern) => {
        const target = event.target;
        let {name, value} = target;
        if (pattern) value = value.replace(/ /g, '-');
        if (model.hasOwnProperty(name)) model[name] = value;
        setState({...state, ...{[name]: model[name]}});

        //La primera vez que setea el formulario, valida la disponibilidad del puerto por defecto
        if (!firstTime) return;
        checkPort();
        setFirstTime(false)
    };
    const checkPort = async () => {
        if (!state.port) return;
        const isValid = await model.checkPort(state.port);
        setValidPort(isValid ? 'success' : 'error');
    };

    const {name, port} = model;
    const portText = validPort ? texts.port[validPort] : false;
    const clsPortLabel = `fade-in ${validPort === 'success' ? 'form__text-success' : 'form__text-error'}`;

    if (fetching || !name || !port || !type || validPort !== 'success') btnAttrs.disabled = true;

    return (
        <div className="ds-create-app__fields">
            {model.error &&
             <BeyondAlert title="Ha ocurrido un error" type="error">{model.error}</BeyondAlert>
            }
            <div className="item">
                <BeyondInput
                    name="name" label={texts.name}
                    placeholder={texts.name} required
                    value={state.name} onChange={handleName}/>
                <BeyondInput
                    name="title" label={texts.title}
                    placeholder={texts.title}
                    value={state.title} onChange={handleChange}/>
                <BeyondInput
                    name="port" label={texts.port.label}
                    className="icon-right form__field-port"
                    type="number"
                    placeholder={texts.port}
                    onBlur={checkPort}
                    value={state.port} onChange={handleChange}>
                    <DsIconButton icon="refresh" className="primary" title="Validar puerto"/>
                    {portText && <span className={clsPortLabel} htmlFor="port">{portText}</span>}
                </BeyondInput>
                <BeyondInput
                    value={state.description}
                    placeholder={texts.description}
                    name="description" label={texts.description}
                    onChange={handleChange}/>
            </div>
            <footer className="footer ds-modal__actions">
                <div className="actions">
                    <BeyondButton {...btnAttrs} className="btn-large btn primary" type="submit">
                        {fetching ?
                            <BeyondSpinner className="on-primary" fetching={true}/> : actions.submit
                        }
                    </BeyondButton>
                </div>

            </footer>
        </div>
    );
}
