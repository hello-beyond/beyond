function PreloadCollection({header}) {

    return (
        <div className="ds-projects-board">
            <header className="list_header">
                <h4>
                    <BeyondPreloadText height="17px" width="50px"/>
                </h4>

                <div className="actions">
                    <div className="link">
                        <BeyondPreloadText height="17px" width="50px"/>
                    </div>
                    <span><BeyondPreloadText height="17px" width="50px"/></span>
                </div>
            </header>
            <PreloadItem/>
            <PreloadItem/>
        </div>
    )

}
