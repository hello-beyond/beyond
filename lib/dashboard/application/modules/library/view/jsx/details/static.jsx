function Static({statics, texts}) {

    if (!statics || !statics.items) return null;

    return (
        <div className="detail">
            <DashboardIcon className="detail-icon" name="archive"/>
            <div className="detail-content">
                <h3>{texts.titles.static}</h3>
                <article className="collapse-container">
                    {statics.items.map(statics => <p key={statics.id}>{statics.path}</p>)}
                </article>
            </div>
            <DashboardIconButton className="detail-icon" icon="expandMore"/>
        </div>
    );

}
