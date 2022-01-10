/**
 *
 * @param {ApplicationModule} module
 * @param {Application} application
 * @returns {JSX.Element}
 * @constructor
 */


function Item({module, application}) {
    if (!module?.module) {
        console.warn(`the module ${module.id} does not load correctly`);
        return null;
    }

    const {errors, warnings} = module.module;
    const {workspace} = useDSWorkspaceContext();
    const showModule = event => {
        event.stopPropagation();
        event.preventDefault();
        workspace.openBoard('module', {label: module.module.pathname, moduleId: module.module.id})
    };

    return (
        <article className="module-list__item" onClick={showModule}>
            <div className="col">
                <ModuleInformation module={module.module}/>
                {module.module.name && <p className="p1 bold">{module.module.name}</p>}
                {module.module.description && <span className="p1 light">{module.description}</span>}
            </div>
            <div className="item-information">
                {!!warnings.length && <DashboardIcon icon="warning" className='warning-icon'/>}
                {!!errors.length && <DashboardIcon icon="error" className='error-icon'/>}
            </div>
            <div className="col  actions right-col">
                {/*<DSIconButton*/}
                {/*    icon="scan" title={`total: ${application.errors.length}`}*/}
                {/*    className="circle"*/}
                {/*    onClick={onScan}/>*/}

                <div className="processors__list">
                    <Processors module={module}/>
                </div>
                <ItemActions module={module}/>
            </div>

        </article>
    )
}
