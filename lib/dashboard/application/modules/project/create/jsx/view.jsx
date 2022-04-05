export const ApplicationCreate = function ({closeModal}) {
    const [state, setState] = React.useState({});
    const [type, setType] = React.useState(undefined);
    const notify = NotifyManager;
    const model = createController.model;
    const spinner = React.useRef();
    const {fetching, error} = state;
    useBinder([createController], () => {
        const fetching = model.fetching || model.application?.fetching;
        if (model.created) {
            closeModal();
            notify.success(texts?.created);
            window.setTimeout(model.clean(), 100);
            return;
        }

        setState(() => ({...state, fetching: model.fetching, error: model.error}));
    });

    React.useEffect(() => {
        if (fetching) {
            window.setTimeout(() => spinner.current?.classList.toggle('container-hidden'), 100);
        }
    }, [fetching]);

    const output = [];

    if (createController.ready) {
        output.push(
            <React.Fragment key="content">
                <Header/>
                <Form/>
            </React.Fragment>
        );
    }
    const texts = createController.texts;
    const cls = `${(model.fetching) ? ' is' : ''}`
    return (
        <CreateAppContext.Provider value={{type, setType, model, texts, error, fetching}}>
            <BeyondModal show onClose={closeModal} className='md ds-modal ds-app-create_modal'>
                <div className={cls}>
                    {output}
                    {fetching &&
                     <DSSpinner ref={spinner} active className="absolute-container container-hidden"/>
                    }
                </div>
            </BeyondModal>
        </CreateAppContext.Provider>
    );
};
