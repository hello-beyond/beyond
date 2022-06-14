function ProjectsPanel() {

    const model = DSNotifications;
    const {texts} = useDsNotificationContext();
    const output = [];

    model.projects.forEach(item => {
        const {application} = item;
        output.push(<ProjectNotifications key={application.id} project={item}/>);
    });

    return (
        <div className="ds-resume ds-resume__panel ds-resume__panel--projects">
            <header>
                <span className="title">
                    {texts.projects.title}
                </span>
            </header>
            <ul>
                {output}
            </ul>
        </div>
    )
}
