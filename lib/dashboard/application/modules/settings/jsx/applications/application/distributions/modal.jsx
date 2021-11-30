const ModalDistributions = ({setModal, texts}) => {
    const {selected} = useAppsSettingsContext();

    if (!selected.deployment) {
        console.warn("the application selected does not has distributions");
        return null;
    }
    const {deployment: {distributions}} = selected;

    const [formValues, handleChange] = useForm({
        name: '', port: '', distDefault: '', compress: '', ssr: '',
        default: '', platform: 'web', environment: 'development',
    });
    const [bool, setBool] = React.useState({
        compress: false, distDefault: false, ssr: false, checked: false
    });
    const {distDefault, compress, ssr, checked} = bool;
    const {name, platform, environment} = formValues;

    const handleChangeDistDefault = () => setBool({...bool, distDefault: !distDefault});
    const handleChangeCompress = () => setBool({...bool, compress: !compress});
    const handleChangeSsr = () => setBool({...bool, ssr: !ssr});
    const handleChangeChecked = () => setBool({...bool, checked: !checked});

    const options = [
        {value: 'web', label: 'Web'},
        {value: 'backend', label: 'Backend'},
    ];
    const optionsEnvironment = [
        {value: 'development', label: 'Desarrollo'},
        {value: 'production', label: 'Production'},
    ];

    const close = () => setModal(false);
    const onSubmit = async () => {
        const distribution = {...formValues, ...bool}
        deployment.addDistribution(distribution);
    }

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
            <BeyondForm>
                <div className="item">
                    <BeyondInput
                        name="name" label="Nombre"
                        placeholder="Nombre de la distribucion" required
                        value={name} onChange={handleChange}
                    />
                    <div className="selects-distributions">
                        <div className="distributions-select">
                            <label>{texts.platform}</label>
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
                                name="port" label="Puerto"
                                type="number"
                                placeholder="Puerto"
                                min="1" onChange={handleChange}
                            />
                        </div>
                        <BeyondCheckbox label='TypeScript' checked={checked} onChange={handleChangeChecked}
                                        value={checked}/>

                    </div>

                    <div className="input-switch-distributions">
                        <div className="switch-item">
                            <label htmlFor="">{texts.compress}</label>
                            <BeyondSwitch name="compress" value={compress} onChange={handleChangeCompress}/>
                        </div>
                        <div className="switch-item">
                            <label htmlFor="">{texts.ssr}</label>
                            <BeyondSwitch name="ssr" value={ssr} onChange={handleChangeSsr}/>
                        </div>
                        <div className="switch-item">
                            <label htmlFor="">{texts.default}</label>
                            <BeyondSwitch name="default" value={distDefault} onChange={handleChangeDistDefault}/>
                        </div>
                    </div>
                </div>
                <div className="div-botton-distributions">
                    <BeyondButton className="btn primary beyond-button waves-effect" type="submit">
                        {/* {fetching ?
                     <BeyondSpinner className="on-primary" fetching={true}/> : Añadir
                    } */}
                        {texts.add}
                    </BeyondButton>
                </div>
            </BeyondForm>
        </BeyondModal>
    );
}
