function Preload() {
    return (
        <main className="panels__container">
            <nav className="ds-editor__actions">
                <DSIconButton icon="splitView" title="Split editor"/>
            </nav>
            <div className="ds__panel">
                <section className="ds__tabs-container">
                    <div className="ds__tab item-active">
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                </section>
                <BeyondScrollContainer className="panel__container">
                    <div/>
                </BeyondScrollContainer>
            </div>
        </main>
    );
}
