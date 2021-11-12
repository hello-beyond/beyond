function AppPreload() {

    return (
        <div className="ds-application-view-layout">
            <Toolbar/>
            <WorspaceAside/>
            <div className="ds__main-container">
                {children}
            </div>
            <FooterBar/>
        </div>
    )
}