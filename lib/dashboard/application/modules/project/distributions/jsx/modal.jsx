const ModalDistributions = ({showModal, application, texts}) => {

    const {workspace: {dashboard}} = useDSWorkspaceContext();
    const [ready, setReady] = React.useState(false);
    const [isValid, setIsValid] = React.useState(false);
    const [fetching, setFetching] = React.useState(false);
    const [error, setError] = React.useState(false);

    const defaultValues = {
        state: {
            checked: false, checkType: false,
            name: '', port: 8080, compress: false, ssr: false,
            isDefault: false, platform: 'web', environment: 'development'
        }
    };
    const [formValues, handleChange] = useForm(defaultValues);
    console.log('formValues', formValues)
    const {name, platform, port, environment, isDefault, compress, ssr, checkType, checked} = formValues;

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

    console.log('texts', texts)

    const textsPlatform = texts.platform;
    const options = [
        {value: 'android', label: textsPlatform.options.android, name: 'platform'},
        {value: 'ios', label: textsPlatform.options.ios, name: 'platform'},
        {value: 'web', label: textsPlatform.options.web, name: 'platform'},
        {value: 'backend', label: textsPlatform.options.backend, name: 'platform'},
        {value: 'ssr', label: textsPlatform.options.ssr, name: 'platform'},
        {value: 'node', label: textsPlatform.options.node, name: 'platform'},
    ];
    const optionsEnvironment = [
        {value: 'development', label: textsPlatform.environments.dev, name: "environment"},
        {value: 'production', label: textsPlatform.environments.prod, name: "environment"},
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

    const portMessage = isValid ? textsPlatform.port.success : textsPlatform.port.error;
    const clsPortLabel = `fade-in ${isValid ? 'form__text-success' : 'form__text-error'}`;
    return (
        <BeyondModal show onClose={close} className="md ds-modal distributions-modal">
            <header className="ds-modal_header">
                <section className="section-header">
                    <h4>{textsPlatform.titleModal}</h4>
                    <h5 className="primary-color">
                        {textsPlatform.modalHeader}
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
                                <label>{textsPlatform.label}</label>
                                <DSSelect name="platform" options={options} value={platform} onSelect={handleChange}/>
                            </div>
                            <div className="distributions-select">
                                <label>{textsPlatform.environment}</label>
                                <DSSelect name="environment" options={optionsEnvironment}
                                          value={environment} onSelect={handleChange}/>
                            </div>
                        </div>
                        <div className="input-group-distributions">
                            <div className="port">
                                <BeyondInput
                                    onBlur={onBlurPort}
                                    name="port" label={textsPlatform.port.label}
                                    type="number"
                                    value={port}
                                    placeholder={textsPlatform.port.label}
                                    min="1" onChange={handleChange}
                                />
                                <span className={clsPortLabel}>{portMessage}</span>
                            </div>
                        </div>

                        <div className="input-switch-distributions">
                            <div className="switch-item">
                                <label>{textsPlatform.checkType}</label>
                                <BeyondSwitch name="checkType"
                                              checked={checkType} onChange={checkSwitch}
                                              value={checkType}/>
                            </div>
                            <div className="switch-item">
                                <label>{textsPlatform.compress}</label>
                                <BeyondSwitch name="compress" value={compress} onChange={checkSwitch}/>
                            </div>
                            <div className="switch-item">
                                <label>{textsPlatform.ssr}</label>
                                <BeyondSwitch name="ssr" value={ssr} onChange={checkSwitch}/>
                            </div>
                            <div className="switch-item">
                                <label>{textsPlatform.default}</label>
                                <BeyondSwitch name="default" value={isDefault} onChange={checkSwitch}/>
                            </div>
                        </div>
                    </div>
                    <div className="ds-modal__actions">
                        <BeyondButton
                            {...disabled}
                            className="btn primary beyond-button waves-effect" type="submit">
                            {fetching ? <BeyondSpinner className="on-primary" fetching={true}/> : textsPlatform.add}
                        </BeyondButton>
                    </div>
                </>
            </BeyondForm>
        </BeyondModal>
    );
}
