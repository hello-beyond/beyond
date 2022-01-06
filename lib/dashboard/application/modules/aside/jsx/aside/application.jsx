/**
 * Renders the application tree

 * @param tree
 * @returns {JSX.Element}
 * @constructor
 */


function ApplicationTree({tree}) {

    let {panels, application, texts} = useDSAsideContext();
    const {workspace} = useDSWorkspaceContext();

    const toPrint = [];
    texts = texts.tree;
    if (!application) return null;

    toPrint.push(
        <DSTree title={texts.modules} tree={application.modulesTree} key="application"/>
    );

    application.libraries.forEach(library => {
        const modules = application.itemsByContainer(library.id);
        if (!modules.length) return;
        toPrint.push(<DSTree key="modules" title={library.library.name} tree={modules}/>);
    });

    const openInfo = event => {
        event.stopPropagation();
        event.preventDefault();
        workspace.openApp(application?.application?.id);
    };
    return (
        <div>
            <header className="ds-aside__header flex-row flex-space">
                <h3 className="row">
                    {application.application.name ?? application.id}
                </h3>
            </header>

            <div className="aside__link" onClick={openInfo}>
                <DSIcon icon="info"/>
                <span> Information </span>
            </div>
            {toPrint}
        </div>
    )
}
