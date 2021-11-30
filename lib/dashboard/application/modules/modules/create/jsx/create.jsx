export const CreateModuleForm = ({workspace, onClose}) => {
    const [state, setState] = React.useState({});
    const [template, setTemplate] = React.useState(false);
    const selectOrigin = origin => {
        const {controller: {model}} = state;
        model.origin = origin;
        model.cleanType();
        setTemplate(false);
    }

    const close = () => window.setTimeout(() => {
        setState({});
        onClose();
    }, 300);

    React.useEffect(() => {
        const controller = new Controller(workspace);
        const onChange = () => setState({...controller.state, controller});
        controller.bind('change', onChange);
        onChange();
        return () => controller.unbind('change', onChange);
    }, []);

    if (!state.ready) return null;

    const {controller: {model, texts, bundleType, application}} = state;
    const origin = model.origin;
    const value = {
        texts,
        origin,
        close,
        template,
        selectOrigin,
        bundle: bundleType,
        model, application,
        selectTemplate: template => setTemplate(template)
    };

    const output = (
        <div className="ds-create-module">
            <header className="ds-modal_header">
                <section>
                    <h4>{texts.title}</h4>
                    <h5 className="primary-color">
                        {texts.subtitle}
                    </h5>
                </section>
            </header>
            <section className="ds-modal_content">
                <Types/>
                {origin && value.model.type && <Form/>}
            </section>
        </div>
    );

    return (
        <CreateModuleContext.Provider value={value}>
            <BeyondModal className="md modal-md ds-modal" show onClose={close}>
                {output}
            </BeyondModal>
        </CreateModuleContext.Provider>
    );
}
