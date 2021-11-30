function StaticsRootTree() {
    const {workspace: {application}} = useDSWorkspaceContext();
    const {texts} = useDSAsideContext();
    if (!application.application) return null;

    return (
        <>
            <header className="ds-aside__header">
                <h3>{texts.template.title}</h3>
            </header>
            <DSTree title={texts.static.title} object={application.application} tree={application.static}/>
        </>
    );
}
