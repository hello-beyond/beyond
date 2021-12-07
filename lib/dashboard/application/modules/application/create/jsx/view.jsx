export const ApplicationCreate = function ({show, closeModal}) {

    const [state, setState] = React.useState({});
    const [type, setType] = React.useState(undefined);
    const notify = NotifyManager;
    const model = createController.model;
    useBinder([createController], () => {
        const fetching = model.processing || model.application?.fetching;
        if (model.created) {
            closeModal();
            notify.success(texts?.created);
            return;
        }
        setState(() => ({...state, fetching}));

    });

    const {fetching} = state;
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
    return (
        <CreateAppContext.Provider value={{type, setType, model, texts, fetching}} key="content">
            <BeyondModal show={show} onClose={closeModal} className="md ds-modal ds-app-create_modal">
                {output}
            </BeyondModal>
        </CreateAppContext.Provider>
    );

};
