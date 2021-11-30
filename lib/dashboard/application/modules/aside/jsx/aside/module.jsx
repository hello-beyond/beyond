/**
 * Render the module tree
 * @param module ModuleModel, is optional only is passed if the tree will be showed into the application tree.
 * @param hideTitle
 * @returns {JSX.Element}
 * @constructor
 */

export function ModuleTree({module, hideTitle = false}) {
    let {application: {moduleManager: {active}}} = useDSAsideContext();
    let {texts} = useDSAsideContext();

    const model = module ?? active;

    if (!model || !model?.bundles) {
        return (
            <div className="ds__aside__detail">
                <div className="alert alert-info">
                    <h3>{texts.module.empty.title}</h3>
                    <span>{texts.module.empty.description}</span>
                </div>
            </div>
        );
    }
    const {bundlesTree, static: staticFiles} = model;
    const specs = {};
    if (!hideTitle) specs.title = model.name;

    return (
        <>
            {bundlesTree && <DSTree  {...specs} tree={bundlesTree}/>}
            {staticFiles && <DSTree title={texts.static.title} tree={staticFiles}/>}
        </>
    );
}
