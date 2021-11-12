function AddStatic({closeModal, item}) {

    const btn = React.useRef(null);
    const box = React.useRef(null);
    const {workspace: {application, uploader}} = useDSWorkspaceContext();
    const [state, setState] = React.useState({error: false, items: uploader.items});

    const update = () => {
        if (uploader.items < 1) return;
        setState({...state, ...{items: uploader.items}});
    }
    React.useEffect(() => {
        const getModel = () => {
            if (item.table?.name === 'modules-static') return item;
            return item.object.table.name === 'applications-static' ? application : item.object.module;
        }
        uploader.create(btn.current, box.current, getModel());
    }, []);
    useBinder([uploader], update);

    // <BeyondModal show onClose={removeAction} className="lg ds-modal ds-tree__static-form">
    return (
        <div className="ds-static-form">
            <header className="ds-modal_header">
                <section>
                    <h4>Agrega un archivo</h4>
                    <h5 className="primary-color">Para los estaticos de tu aplicación</h5>
                </section>
            </header>

            <section className="ds-modal__content">
                <div className="jd-gallery__drop-zone" ref={box}>
                    <BeyondIcon icon="upload"/>
                    <h3 ref={btn}>Selecciona una image o arrastrala.</h3>
                    {state.error &&
                     <div className="alert alert-danger">
                         El archivo subido no es válido, por favor verifiquelo y vuelva a intentarlo
                     </div>
                    }
                </div>
                <GalleryView/>
                <div className="actions">
                    <BeyondButton onClick={closeModal} className="primary">
                        Cerrar
                    </BeyondButton>
                </div>
            </section>

        </div>
    );
}
