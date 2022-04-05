function Form() {
    const {application: {application}, close, model, workspace, template, texts} = useCreateModuleContext();
    if (!template) return null;
    const spinner = React.useRef();
    const [error, setError] = React.useState();
    const [initial, setInitial] = React.useState(true);

    const styles = template === 'page' || template === 'widget' || template === 'layout';
    const [state, setState] = React.useState({styles: styles});
    const [fetching, setFetching] = React.useState(false);
    const disabled = {};
    React.useEffect(() => {
        if (fetching) {
            window.setTimeout(() => spinner.current?.classList.toggle('container-hidden'), 100);
        }
    }, [fetching]);
    const onSubmit = async event => {
        event.preventDefault();
        try {
            if (model.type === 'page' && application.routes().includes(model.bundle.route)) {
                setError(`${texts.form.errors.route} ${model.bundle.route}`);
                return;
            }

            const exp = /[a-z]+-[a-z]+/g;
            const widgets = ['widget', 'page', 'layout'];
            if (widgets.includes(model.type) && !model.bundle.element.match(exp)) {
                setError(`${texts.form.errors.element}`);
                return;
            }

            setFetching(true);
            const response = await model.bundle.publish();
            window.setTimeout(() => {
                if (response.error) {
                    setFetching(false);
                    setError(response.error);
                    return;
                }
                const openModule = () => {
                    workspace.openBoard('module', {label: model.bundle.name, moduleId: model.bundle.moduleId});
                    setFetching(false);
                    close();
                };
                setTimeout(openModule, 500);
            }, 1000);

        }
        catch (exc) {
            setError(exc.error);
        }
    };

    const handleChange = event => {
        const target = event.currentTarget;
        const value = {};
        let fieldValue = target.value;

        if (target.name === 'name' || target.name === 'element') {
            fieldValue = fieldValue.replace(/ /g, '-');
        }

        //Seteamos el valor por defecto del estado
        if (initial) {
            model.bundle.set('styles', state.styles);
            setInitial(false);
        }

        value[target.name] = fieldValue;
        const newState = {...state, ...value};
        model.bundle.set(target.name, fieldValue);
        setState(newState);
    };

    if (fetching) disabled.disabled = true;
    const props = {state, setState, handleChange, disabled};
    return (
        <>
            {error && <BeyondAlert type="error" message={error}/>}
            <AsideForm/>
            <div className="ds-create-module__template-form">
                <BeyondForm onSubmit={onSubmit}>
                    <FormPage {...props}/>
                    <FormWidget {...props}/>
                    <FormLayout {...props}/>
                    <FormCode {...props}/>
                    <FormBridge {...props}/>
                    <FormTypescript {...props}/>
                </BeyondForm>
                {fetching &&
                 <DSSpinner ref={spinner} active className="absolute-container container-hidden"/>
                }
            </div>
        </>
    );
}
