function View({controller}) {
    const [processing, setProcessing] = React.useState();
    const [showForm, setShowForm] = React.useState(true);
    const [galleryItems, setGalleryItems] = React.useState(controller.items);

    React.useEffect(() => {
        const onChange = () => {
            setGalleryItems([...controller.items.values()])
            setProcessing(controller.processing);
        };
        controller.bind('change', onChange);
        return () => controller.unbind('change', onChange);
    }, [controller.items, controller.ready]);

    const value = {
        controller: controller,
        total: controller.items.length,
        processing: controller.processing
    };

    if (controller.ready) return <h3>Cargando</h3>;

    return (
        <JGalleryContext.Provider value={value}>
            <div className="header">
                <header className="jadmin-page-header border-header">
                    <h1>Carga de imagenes</h1>
                    <div className="actions">
                        <button className=" btn btn-primary" onClick={() => setShowForm(true)}>
                            Agregar
                        </button>
                    </div>
                </header>
                {showForm && <UploaderForm/>}
                <GalleryView/>
            </div>
        </JGalleryContext.Provider>
    );
}