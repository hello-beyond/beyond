function Preloader() {
    return (
        <div className="ds__board">
            <div className="application__detail">
                <section className="board__header">
                    <header>
                        <h2><BeyondPreloadText height="17px" width="50px"/></h2>
                        <span className="pathname"><BeyondPreloadText height="7px" width="150px"/></span>
                    </header>
                    <div className="board__header__actions flex-center flex-container">

                        <div className="scanned__section  flex-center flex-container">
                            <span className="title"><BeyondPreloadText height="7px" width="100px"/></span>

                            <div className="detail_item">
                                ...
                            </div>
                            <button className="beyond-icon-button circle button--fetching">
                                <BeyondSpinner active className="primary"/>
                            </button>
                        </div>
                        <BeyondButton icon="distributions" className="btn primary"/>
                        <DSIconButton className="circle bee--action action--play" icon="compile"/>
                        <DSIconButton icon="play"/>
                        <button className="beyond-icon-button circle button--fetching">
                            <BeyondSpinner active className="primary"/>
                        </button>
                        <BeyondButton className="btn primary">
                            <BeyondSpinner className="on-primary"/>
                        </BeyondButton>

                    </div>
                </section>
                <div className="pd-base">
                    <span className="link"> <BeyondPreloadText height="7px" width="50px"/></span>
                </div>


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
