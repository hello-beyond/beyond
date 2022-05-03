function DiagnosticItem({item, module}) {
    const {texts} = useDsNotificationContext();
    const message = item.message === 'TOTAL' ? texts.item.diagnostics.totalDependencies : item.message;
    const {workspace} = useDSWorkspaceContext();
    const onClick = event => {
        event.preventDefault();
        workspace.openBoard('module', {label: module.path, moduleId: module.id})
    };
    return (
        <div onClick={onClick}>
            <div className="file">{item.file}</div>
            {item.message === 'TOTAL' && <strong>{item.total} </strong>}
            {message}
        </div>
    );
}
