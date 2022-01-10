function ApplicationsPanel() {

    const model = DSNotifications;
    const {texts} = useDsNotificationContext();
    const {workspace} = useDSWorkspaceContext();
    const output = [];

    model.applications.forEach(item => {
        const {application} = item;
        const openApp = () => workspace.openApp(application.id);
        output.push(
            <li key={application.id} onClick={openApp}>
                <span className="item__name">
                {application.name ?? texts.projects.noName}
                </span>
                <div className="item__detail">
                    <span className="label">{texts.projects.scanned}</span>
                    <span className="detail">
                    {item.processed}/{item.total}
                    </span>

                </div>
            </li>
        )
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
