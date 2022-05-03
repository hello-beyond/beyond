function LeftPanel({library, actions, texts}) {

    return (
        <aside className="panel-left">
            <header className="item info-app">
                <div className="logo"/>
                <h1>{library.name}</h1>
            </header>
            <LibraryDescription library={library} actions={actions} texts={texts}/>
            <div className="item-detail-container">
                <div className="detail-info">
                    <DashboardIcon className="detail-icon" name="link"/>
                    <div>
                        <h3>{texts.titles.path}</h3>
                        <p>{library.path}</p>
                    </div>
                </div>
                <Statics texts={texts} library={library}/>
            </div>
        </aside>
    )
}
