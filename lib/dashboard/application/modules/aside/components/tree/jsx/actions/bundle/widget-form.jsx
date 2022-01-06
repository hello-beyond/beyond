function WidgetForm() {
    const {
        handleChange,
        texts: {widget: texts},
        fetching,
        setValue,
        formValues,
        reset,
        errors,
    } = useAddBundleContext();
    const {name, route, layoutId, type} = formValues;

    const handleChangeSelect = ele => setValue({type: ele.value});
    const options = [
        {value: 'page', label: 'Page'},
        {value: 'layout', label: 'Layout'},
        {value: 'widget', label: 'Widget'},
    ];
    const toReturn = () => reset();
    const attrs = {onChange: handleChange};
    if (fetching) attrs.disabled = true;

    return (
        <>
            <Header back={toReturn} title={texts.title}/>
            <FormAction>
                <div className="group-inputs">
                    <div className="input-field">
                        <input
                            name="name"
                            placeholder={texts.inputs.name.label}
                            value={name}
                            {...attrs}
                            required
                            disabled={fetching}
                        />
                        {errors.name && <span className="error-message">{texts.inputs.name.error}</span>}

                    </div>
                    <div className="form-select">
                        <label>{texts.inputs.type.label}</label>
                        <div className="relative__container">
                            <DSSelect label={texts.inputs.type.placeholder}
                                      options={options}
                                      value={type} onSelect={handleChangeSelect}/>
                        </div>

                    </div>
                    {type === 'page' &&
                     <div className="input-field">
                         <label>{texts.inputs.route.label}</label>
                         <input
                             required
                             name="route"
                             value={route}
                             placeholder={texts.inputs.route.label}
                             {...attrs}
                         />
                         {errors.route && <span className="error-message">{texts.inputs.route.error}</span>}
                     </div>
                    }
                    {type === 'layout' &&
                     <div className="input-field">
                         <label>{texts.inputs.layoutId.label}</label>
                         <input
                             required
                             name="layoutId"
                             value={layoutId ?? ''}
                             placeholder={texts.inputs.layoutId.label}
                             {...attrs}
                         />
                         {errors.route && <span className="error-message">{texts.inputs.layoutId.error}</span>}
                     </div>
                    }
                </div>
            </FormAction>
        </>
    );
}
