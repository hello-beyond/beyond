function ModuleLink({am, children}) {
    const {workspace} = useDSWorkspaceContext();
    const {project} = useAppContext();
    const showModule = event => {
        event.stopPropagation();
        event.preventDefault();
        workspace.openBoard('module', {
            label: am.module.pathname,
            moduleId: am.module.id,
            projectId: project.application.id
        });
    };
    return (
        <article className="module-list__item" onClick={showModule}>
            {children}
        </article>
    )
}
