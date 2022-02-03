const ModalDistributions = ({showModal, application, texts}) => {

    const {workspace: {dashboard}} = useDSWorkspaceContext();
    const [ready, setReady] = React.useState();
    const [isValid, setIsValid] = React.useState(false);
    const [fetching, setFetching] = React.useState(false);
    const [error, setError] = React.useState(false);

    const defaultValues = {
        checked: false,
        name: '', port: 8080, compress: false, ssr: false,
        isDefault: false, platform: 'web', environment: 'development',
        checkType: false
    };
    const [formValues, handleChange] = useForm(defaultValues);

    React.useEffect(() => {
        (async () => {
            const port = await dashboard.availablePort();
            setReady(true);
            setIsValid(true);
            handleChange({target: {name: 'port', value: port}});
        })();
    }, []);

    if (!ready) return null;
    const {deployment: {distributions}} = application;
    const {name, platform, port, environment, isDefault, compress, ssr, checkType, checked} = formValues;

    const options = [
        {value: 'android', label: texts.platform.options.android, name: 'platform'},
        {value: 'ios', label: texts.platform.options.ios, name: 'platform'},
        {value: 'web', label: texts.platform.options.web, name: 'platform'},
        {value: 'backend', label: texts.platform.options.backend, name: 'platform'},
        {value: 'ssr', label: texts.platform.options.ssr, name: 'platform'},
        {value: 'node', label: texts.platform.options.node, name: 'platform'},
    ];
    const optionsEnvironment = [
        {value: 'development', label: texts.environments.dev, name: "environment"},
        {value: 'production', label: texts.environments.prod, name: "environment"},
    ];

    const close = () => showModal(false);
    const onSubmit = async () => {
        setFetching(true);
        setError(undefined);
        const response = await application.deployment.addDistribution(formValues);

        setFetching(false);
        if (response?.error) {
            setError(response.error);
            return;
        }
        showModal(false);
    };
    const onBlurPort = async event => {
        setFetching(true);
        const isValid = await controller.model.checkPort(port);
        setIsValid(isValid)
        setFetching(false);
    }

    const disabled = {};
    const formValid = name && platform && environment;
    const checkSwitch = event => {
        const target = event.currentTarget;
        handleChange({target: {name: target.name, value: target.checked}});
    }
    if (!isValid || !formValid) disabled.disabled = true;

    const portMessage = isValid ? texts.port.success : texts.port.error;
    const clsPortLabel = `fade-in ${isValid ? 'form__text-success' : 'form__text-error'}`;
    return (
        <BeyondModal show onClose={close} className="md ds-modal distributions-modal">
            <header className="ds-modal_header">
                <section className="section-header">
                    <h4>{texts.titleModal}</h4>
                    <h5 className="primary-color">
                        {texts.modalHeader}
                    </h5>
                </section>
            </header>
            <BeyondForm onSubmit={onSubmit}>
                <>
                    {error && <BeyondAlert type="error"> {texts.errors[error]} </BeyondAlert>}
                    <div className="item">
                        <BeyondInput
                            name="name" label={texts.name}
                            placeholder={texts.name} required
                            value={name} onChange={handleChange}
                        />
                        <div className="selects-distributions">
                            <div className="distributions-select">
                                <label>{texts.platform.label}</label>
                                <DSSelect name="platform" options={options} value={platform} onSelect={handleChange}/>
                            </div>
                            <div className="distributions-select">
                                <label>{texts.environment}</label>
                                <DSSelect name="environment" options={optionsEnvironment}
                                          value={environment} onSelect={handleChange}/>
                            </div>
                        </div>
                        <div className="input-group-distributions">
                            <div className="port">
                                <BeyondInput
                                    onBlur={onBlurPort}
                                    name="port" label={texts.port.label}
                                    type="number"
                                    value={port}
                                    placeholder={texts.port.label}
                                    min="1" onChange={handleChange}
                                />
                                <span className={clsPortLabel}>{portMessage}</span>
                            </div>
                        </div>

                        <div className="input-switch-distributions">
                            <div className="switch-item">
                                <label>{texts.checkType}</label>
                                <BeyondSwitch name="checkType"
                                              checked={checkType} onChange={checkSwitch}
                                              value={checkType}/>
                            </div>
                            <div className="switch-item">
                                <label>{texts.compress}</label>
                                <BeyondSwitch name="compress" value={compress} onChange={checkSwitch}/>
                            </div>
                            <div className="switch-item">
                                <label>{texts.ssr}</label>
                                <BeyondSwitch name="ssr" value={ssr} onChange={checkSwitch}/>
                            </div>
                            <div className="switch-item">
                                <label>{texts.default}</label>
                                <BeyondSwitch name="default" value={isDefault} onChange={checkSwitch}/>
                            </div>
                        </div>
                    </div>
                    <div className="ds-modal__actions">
                        <BeyondButton
                            {...disabled}
                            className="btn primary beyond-button waves-effect" type="submit">
                            {fetching ?
                                <BeyondSpinner className="on-primary" fetching={true}/> :
                                texts.add
                            }

                        </BeyondButton>
                    </div>
                </>

            </BeyondForm>
        </BeyondModal>
    );
}
