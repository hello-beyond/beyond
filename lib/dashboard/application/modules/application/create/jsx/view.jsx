export const ApplicationCreate = function ({show, closeModal}) {

    const [state, setState] = React.useState({});

    React.useEffect(() => {
        const model = new BuilderApplication()
        const notify = NotifyManager;
        const onChange = () => {
            const fetching = model.processing || model.application?.fetching;
            const {value: texts, ready} = module.texts
            if (model.created) {
                closeModal();
                notify.success('¡Aplicacion creada!');
                return;
            }
            setState(() => ({...state, model, fetching, texts, ready}));
        };
        module.texts.bind('change', onChange)
        const {value: texts, ready} = module.texts;
        setState({...state, model, texts, ready});
        model.bind('change', onChange);
        return () => {
            model.unbind('change', onChange);
            module.texts.unbind('change', onChange);
        }

    }, []);
    const {ready, model, texts, fetching} = state;
    const output = [];
    if (ready) {
        output.push(
            <React.Fragment key="content">
                <Header/>
                <Form/>
            </React.Fragment>
        );
    }

    return (
        <CreateAppContext.Provider value={{model, texts, fetching}} key="content">
            <BeyondModal show={show} onClose={closeModal} className="md ds-modal ds-app-create_modal">
                {output}
            </BeyondModal>
        </CreateAppContext.Provider>
    );

};
