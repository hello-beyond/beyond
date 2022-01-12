function FormAction({children}) {
    const {
        texts: {actions},
        formValues,
        fetching,
        object,
        errors,
        setFetching,
        reset,
        closeModal,
    } = useAddBundleContext();
    const totalErrors = Object.keys(errors).length;
    const {name, type, route, bundle, layoutId} = formValues;
    const saveBundle = async specs => {
        setFetching(true);
        await object.addBundle(specs);
        setFetching(false);
        reset();
        closeModal(false);
    }
    const onClick = e => e.stopPropagation();
    const onSave = async e => {
        e.preventDefault();
        e.stopPropagation();
        const specs = {bundles: bundle}
        if (bundle === 'widget') {
            specs.element = {name: name};
            if (type === 'layout') specs.id = layoutId;
            if (type === 'page') specs.route = route;
        }

        saveBundle(specs);
    };
    const attrs = {};
    const isWidgetValid = bundle === 'widget' && !!name && !!type;
    const isPageValid = isWidgetValid && type === 'page' && !!route;
    const isBundleValid = !!bundle && (isWidgetValid || bundle !== 'widget');
    if (fetching || !isWidgetValid && !isBundleValid) attrs.disabled = true;
    if (isWidgetValid && type === 'page' && !isPageValid) attrs.disabled = true;
    if (totalErrors) attrs.disabled = true;
    return (
        <div onClick={onClick} className="ds-modal__content">
            <form onSubmit={onSave}>
                {children}
                <div className={`actions end`}>
                    <BeyondButton type="submit" {...attrs} onClick={onSave} className="primary">
                        {fetching
                            ? <BeyondSpinner fetching={true} className="on-primary"/>
                            : actions.save
                        }
                    </BeyondButton>
                </div>
            </form>
        </div>
    );
}
