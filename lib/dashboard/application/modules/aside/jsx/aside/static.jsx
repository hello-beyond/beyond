function StaticsRootTree() {
    const {workspace: {application}} = useDSWorkspaceContext();
    const {texts} = useDSAsideContext();
    if (!application.application) return null;

    return (
        <>
            <header className="ds-aside__header">
                <h3>{texts.static.title}</h3>
            </header>
            <DSTree title={texts.static.title} object={application.application} tree={application.static}/>
        </>
    );
}
