function ApplicationItem({item, texts}) {

    const {workspace} = useDSWorkspaceContext();

    const modules = () => workspace.openApp(item.id);

    const application = item;
    if (!application.fetched) return <PreloadItem/>;
    const description = application.description ?? texts.description;
    const openNavigator = event => {
        event.preventDefault();
        event.stopPropagation();
        workspace.openNavigator(application.id, event.currentTarget.href);
    }
    return (
        <div className="ds-item_list" key={application.id} onClick={modules}>
            <div className="item-info">
                <h4 className="link bold">
                    {application.name}
                </h4>
                <p className="p1">{description}</p>
                <a onClick={openNavigator}
                   href={application.url} className="link" target="_blank">
                    {`localhost:${application.port}`}
                </a>
                <p className="p2 primary-dark-color">{application.path}</p>
            </div>
            <ApplicationActions application={application}/>
        </div>
    );
}
