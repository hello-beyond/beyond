/**
 *
 * @param {ApplicationModule} module
 * @returns {JSX.Element}
 * @constructor
 */
function GridItem({am}) {

    const {application, navigateModule} = useAppContext();
    const {errors, warnings} = am.module;
    let {path, name} = am.module;
    path = path.toLowerCase().replace(application.application.path.toLowerCase(), '');
    return (
        <ModuleLink am={am}>
            <section>
                <div className="col mb-15">
                    <Processors am={am}/>
                </div>
                <div className="item-information col col-end">
                    {!!warnings.length && <DSIcon icon="warning" className="icon icon--warning"/>}
                    {!!errors.length && <DSIcon icon="error" className="icon icon--error"/>}
                </div>
            </section>
            <ModuleInformation am={am}/>
            <div className="col">
                <h6 className="primary-color">{path}</h6>
                {am.module.description && <span className="p1 light">{am.module.description}</span>}
            </div>
            <ItemActions am={am}/>
        </ModuleLink>
    );
}
