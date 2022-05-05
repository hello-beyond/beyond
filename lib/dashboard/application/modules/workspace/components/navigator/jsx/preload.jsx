function Preload() {

    return (
        <div className="ds-navigator__container is-fetching">
            <section className="ds-navigator__bar">
                <form className="ds-navigator__form">
                    <BeyondIconButton icon="refresh" readOnly/>
                    <input placeholder="localhost:port" readOnly/>
                    <BeyondIconButton icon="responsive" readOnly/>
                </form>
            </section>
            <div className="ds-navigator__iframe__container">
                <IframeFetching/>
            </div>
        </div>
    )
}
