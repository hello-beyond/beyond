function ProjectNotifications({project}) {

    const {texts} = useDsNotificationContext();
    const {workspace} = useDSWorkspaceContext();
    const {application} = project;
    const output = [];
    const notifications = React.useRef();
    project?.modules.forEach(module => {
        if (!module.id) return;
        output.push(<ModuleNotifications module={module} key={`module-${project.id}-${module.id}`}/>)
    });

    const openApp = () => workspace.openApp(application.id);
    const clickOnApp = event => {
        event.preventDefault();
        event.stopPropagation();

        notifications.current.classList.toggle('project__notifications--opened');
    }
    return (
        <li onClick={clickOnApp}>
            <header className="project__header">
                <span className="item__name">
                {application.name ?? texts.projects.noName}
                </span>
                <div className="item__detail">
                    <span className="label">{texts.projects.scanned}</span>
                    <span className="detail">
                    {project.processed}/{project.total}
                    </span>
                </div>
            </header>
            <section ref={notifications} className="project__notifications">
                {output}
            </section>

        </li>
    );

}
