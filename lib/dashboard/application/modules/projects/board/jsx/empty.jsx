const Empty = () => {
    const {texts} = useDSApplicationsContext();
    const {showProjectForm} = useDSWorkspaceContext();
    return (
        <div className="ds-empty-container">
            <header>
                <h2 className="primary-color">{texts.empty.title}</h2>
                <h3 className="h1 on-secondary">{texts.empty.subtitle}</h3>
            </header>
            <div className="ds-empty_buttons-container">
                <BeyondButton onClick={showProjectForm} className="btn primary btn-primary icon-on-primary">
                    {texts.actions.create}
                    <DSIcon className="circle" icon="add"/>
                </BeyondButton>
                <div className="break"/>
            </div>
        </div>
    )
}
