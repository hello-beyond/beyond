function AddStatic({closeModal, item}) {

    const btn = React.useRef(null);
    const box = React.useRef(null);
    const {workspace: {application, uploader}} = useDSWorkspaceContext();
    const [state, setState] = React.useState({error: false, items: uploader.items});
    const {texts: {static: {form: texts}}} = useDSTreeContext();
    const update = () => {
        if (uploader.items < 1) return;
        setState({...state, ...{items: uploader.items}});
    }
    React.useEffect(() => {
        const getModel = () => {
            if (item.table?.name === 'modules-static') return item;
            return item.object.table.name === 'applications-static' ? application?.application : item.object.module;
        }
        uploader.create(btn.current, box.current, getModel());
    }, []);
    useBinder([uploader], update);

    // <BeyondModal show onClose={removeAction} className="lg ds-modal ds-tree__static-form">
    return (
        <div className="ds-static-form">
            <header className="ds-modal_header">
                <section>
                    <h4>{texts.header.title}</h4>
                    <h5 className="primary-color">{texts.header.detail}</h5>

                </section>
            </header>

            <section className="ds-modal__content">
                <div className="jd-gallery__drop-zone" ref={box}>
                    <BeyondIcon icon="upload"/>
                    <h3 ref={btn}>{texts.title}</h3>
                    {state.error &&
                     <div className="alert alert-danger">
                         {texts.errors.invalidFiles}
                     </div>
                    }
                </div>
                <GalleryView/>
                <div className="actions">
                    <BeyondButton onClick={closeModal} className="primary">
                        {texts.actions.close}
                    </BeyondButton>
                </div>
            </section>

        </div>
    );
}
