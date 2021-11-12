function Form() {
    const {application, close, model, template, bundle} = useCreateModuleContext();

    // console.log('---bundle---', bundle, 'template', template)
    // console.log('routes ', application.application.routes())

    if (!template) return null;

    const [error, setError] = React.useState();
    const [state, setState] = React.useState({styles: true});
    const [view, setView] = React.useState('basic');

    const onSubmit = async event => {
        event.preventDefault();
        try {

            if (application.application.routes().includes(model.bundle.route)) {
                setError('EPA ERROR de ruta');
                return;
            }

            const response = await model.bundle.publish();
            if (response.error) {
                setError(response.error);
                return;
            }

            close();
            const url = `/application/${application.application.id}`;
            const qs = new URLSearchParams({
                aside: 'module',
                module: model.bundle.moduleId
            }).toString();

            routing.replaceState(`${url}?${qs}`);

        }
        catch (exc) {
            setError(exc.error);
        }
    };

    const handleChange = event => {
        const target = event.currentTarget;

        // console.log('-------------------------------------')
        // console.log(target.name, target.value)

        const value = {};
        let fieldValue = target.value;
        if (target.name === 'name') {
            //TODO: @julio check that the field does not accepts special characters.
            fieldValue = fieldValue.replace(/ /g, '-');
        }
        value[target.name] = fieldValue;
        const newState = {...state, ...value};
        // model.bundle.set(value);
        model.bundle.set(target.name, fieldValue);
        setState(newState);
    };

    const props = {state, setState, handleChange};

    return (
        <>
            {error && <BeyondAlert type="error" message={error}/>}
            <AsideForm/>
            <div className="ds-create-module__template-form">
                <BeyondForm onSubmit={onSubmit}>
                    <FormPage {...props}/>
                    <FormCode {...props}/>
                    <FormLayout {...props}/>
                </BeyondForm>
            </div>
        </>
    );
}
