function Toolbar() {
    const {workspace: {user, application}} = useDSWorkspaceContext();
    const cls = "primary";
    const items = [['Home']];
    if (application) {
        items.push([
            `${application.application.name}`, () => workspace.openApp(application.application.id)
        ]);
    }
    return (
        <section className={`ds-toolbar ${cls}`}>
            <div className="toolbar__aside__logo"/>
            <div className="group-items-toolbar">
                <DsBreadcrumb items={items}/>
                <div className="right__panel">
                    <section className=" user__label">
                        {user.name}
                    </section>
                    <NotificationPanel/>
                </div>

            </div>
        </section>
    );
}
