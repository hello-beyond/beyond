function AppDoc({closeModal}) {

    const go = event => {
        closeModal();
        beyond.navigate('/create_app');
    }

    return (
        <>
            <header className="ds-modal_header">
                <h4>Aplicaciones en Beyond</h4>
            </header>
            <div className="ds-modal_content pd">
                <div className="img-list">
                    <BeyondImage src="/images/logos/js.png"/>
                    <BeyondImage src="/images/logos/react.png"/>
                    <BeyondImage src="/images/logos/socket-1.png"/>
                    <BeyondImage src="/images/logos/typescript.png"/>
                </div>
                <p className="p1">
                    Al crear una nueva aplicación, este dashboard va a
                    crear automáticamente los archivos de configuración
                    necesarios para que puedas comenzar a trabajar em tu nueva app.
                </p>
                <p className="p1">
                    Para conocer todas las opciones disponibles de configuración y los detalles de estos archivos puedes
                    revisar la documentación completa
                </p>
                <footer>
                    <BeyondButton className="primary" onClick={go}>
                        Crear mi primera aplicación
                    </BeyondButton>
                </footer>
            </div>
        </>
    );
}