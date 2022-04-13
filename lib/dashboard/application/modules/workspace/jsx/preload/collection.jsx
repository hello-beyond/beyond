function PreloadCollection({header}) {

    return (
        <>
            {
                header &&
                <DsHeaderBar>
                    <header className="app-header">
                        <div className="info-list">
                            <h4>&nbsp;</h4>
                        </div>
                    </header>
                </DsHeaderBar>
            }
            <div className="ds-container">
                <section>
                    <PreloadHeader title='Applications'/>
                    <PreloadItem/>
                </section>
                <section>
                    <PreloadHeader title='Libraries'/>
                    <PreloadItem/>
                    <PreloadItem/>
                    <PreloadItem/>
                </section>
            </div>
        </>
    )

}