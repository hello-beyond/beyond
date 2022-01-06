function Preloader() {
    return (
        <div>

            <div className="workspace__board ds-board__application application__board">
                <header>
                    <h2><BeyondPreloadText height="10px" width="100px"/></h2>
                    <div className="actions">
                        <BeyondButton style={{
                            width: '150px'
                        }} className="btn primary">
                            <BeyondSpinner className="on-primary"/>
                        </BeyondButton>
                    </div>
                </header>
                <section>
                    <div className="item-information">
                        <div><BeyondPreloadText height="7px" width="50px"/></div>
                        <div className="description-item">
                            <DSIconButton icon="edit"/>
                        </div>

                    </div>
                    <div className="item-information">
                        <div><BeyondPreloadText height="7px" width="50px"/></div>
                        <div className="description-item">

                            <DSIconButton icon="edit"/>
                        </div>

                    </div>
                </section>

            </div>

            <div className="ds-board__application application-header">
                <div className="left-col">
                    <div className="modules-list_header">
                        <section className="header_container">
                            <form>
                                <input className="modules-list_search-input"/>
                            </form>
                        </section>
                        <section className="header_container app__container-filter">
                            <BeyondPreloadText height="7px" width="50px"/>
                            <BeyondIconButton icon="expandMore" className="circle"/>
                            <BeyondPreloadText height="7px" width="50px"/>
                        </section>
                    </div>
                </div>
                <div className="right-col">
                    <div className="actions">
                        <DSIconButton data-view="grid" icon="thSolid" className={`circle`}/>
                        <DSIconButton data-view="table" icon="thSolid" className={`circle`}/>
                    </div>
                    <div className="actions">
                        <span className="tag"> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="tag"> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="tag"> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span className="tag"> &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </div>
                </div>

            </div>

        </div>
    )
}
