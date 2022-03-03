/**
 *
 * @param {ApplicationModule} module
 * @param {Application} application
 * @returns {JSX.Element}
 * @constructor
 */


function Item({am, application}) {

    if (!am?.module) {
        console.warn(`the module ${module.id} does not load correctly`);
        return null;
    }

    const {errors, warnings} = am.module;

    return (
        <ModuleLink am={am}>
            <div className="col">
                <ModuleInformation am={am}/>
                {am.module.name && <p className="p1 bold">{am.module.name}</p>}
                {am.module.description && <span className="p1 light">{am.description}</span>}
            </div>
            <div className="ds-module-list__item__info">
                {!!warnings.length && <DashboardIcon icon="warning" className='warning-icon'/>}
                {!!errors.length && <DashboardIcon icon="error" className='error-icon'/>}
            </div>
            <div className="col  actions right-col">
                <div className="processors__list">
                    <Processors am={am}/>
                </div>
                <ItemActions am={am}/>
            </div>
        </ModuleLink>
    )
}
