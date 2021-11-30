function ApplicationActions({application}) {
    const {texts} = useDSApplicationsContext();

    // noinspection JSMethodCanBeStatic
    const compile = event => {
        event.preventDefault();
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
            {application.bee &&
             <>
                 <DashboardIconButton className="circle" icon="compileService" onClick={compile}
                                      title={texts.actions.compile}/>
             </>

            }
        </article>
    );
}
