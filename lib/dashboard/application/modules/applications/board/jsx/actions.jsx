function ApplicationActions({application}) {
    const {texts} = useDSApplicationsContext();
    const {workspace} = useDSWorkspaceContext();

    // noinspection JSMethodCanBeStatic
    const compile = event => {
        event.stopPropagation()
        event.preventDefault();
        workspace.openBoard('compile', {id: application.id})
    };

    return (
        <article className="right-col actions">
            <BeeActions bee={application.bee} texts={texts.actions}/>
            {
                (!!application.errors.length) &&
                <DashboardIconButton
                    icon="error" title={`total: ${application.errors.length}`}
                    className="circle error-icon"
                    onClick={event => compile(event, 'client', application)}/>
            }
            <DashboardIconButton
                icon="compile" title={texts.actions.compile} className="circle"
                onClick={event => compile(event, 'client', application)}/>

        </article>
    );
}
