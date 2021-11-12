/**
 *
 * @param {ApplicationModule} module
 * @param {Application} application
 * @returns {JSX.Element}
 * @constructor
 */
function GridItem({module, application}) {
    const {errors, warnings} = module.module;
    return (
        <article className="module-list__item">
            <section>
                <div className="col mb-15">
                    <Processors module={module}/>
                </div>
                <div className="item-information col col-end">
                    {!!warnings.length && <DsIcon icon="warning" className="icon icon--warning"/>}
                    {!!errors.length && <DsIcon icon="error" className="icon icon--error"/>}
                </div>
            </section>
            <ModuleInformation module={module.module}/>
            <div className="col">
                <h6 className="primary-color">{module.module.name}</h6>
                {module.module.description && <span className="p1 light">{module.module.description}</span>}
            </div>
            <ItemActions module={module}/>
        </article>
    );
}