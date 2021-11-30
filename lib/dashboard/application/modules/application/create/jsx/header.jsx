const Header = React.memo(() => {
    const {texts} = useCreateAppContext();
    return (
        <header className="ds-modal_header">
            <section>
                <h4>{texts.title}</h4>
                <h5 className="primary-color">
                    {texts.subtitle}
                </h5>
            </section>
        </header>
    );

});