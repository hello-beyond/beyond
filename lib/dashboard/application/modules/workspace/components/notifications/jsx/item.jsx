function NotificationItem({item, icon = "error"}) {
    const {workspace} = useDSWorkspaceContext();
    const {texts} = useDsNotificationContext();
    if (!workspace.application) return null;
    const {application: {application}} = workspace;
    const openModule = () => workspace.openBoard('module', {label: item?.module?.module.pathname});
    const openSource = () => {
        const file = item.file.replace(/\//g, '\\');
        const processorName = 'ts';
        if (!item.bundle.processors.has(processorName)) {
            return;
        }

        const processor = item.bundle.processors.get(processorName);
        const source = processor.sources.items.find(i => i.file === file);
        const position = {lineNumber: item.line, column: item.character};

        const specs = {
            source: source, path: source.relative.file,
            processor: processorName, position: position, module: item.module
        };
        workspace.openFile(specs);
    }

    if (item.type !== 'diagnostics') {
        return (
            <li className="ds-notification__list-item" onClick={openModule}>
                {item.message}
                {item.count > 1 ? item.count : null}
            </li>
        )
    }

    const applicationPath = application?.path.replaceAll('\\', '/').toLowerCase();
    const file = item.file.toLowerCase().replace(applicationPath, '');

    return (
        <li className="ds-notification__list-item" onClick={openSource}>
            <DSIcon className={icon} icon={icon}/>
            <div className="item__information">
                <span className="item__title">{item.message}</span>
                <div className="item__data">
                    <strong>{texts.item.file}</strong>
                    <span className="name-file">{file}</span>
                </div>
                <div className="item__data">
                    <strong>{texts.item.line}</strong>
                    <span className="number-line">{item.line}</span>
                </div>
            </div>
        </li>
    );
}
