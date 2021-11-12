function TemplateRootTree() {

    let {workspace} = useDSWorkspaceContext();
    const {texts} = useDSAsideContext();

    const {application, processors} = workspace?.application?.template;
    const output = [];
    const getTree = (obj, key, title) => <DSTree key={key} title={title} tree={obj}/>;

    output.push(getTree(application, "Aplicacion", "Aplicación"));
    processors.forEach((processor, key) => output.push(getTree(processor, key, key)));

    return (
        <>
            <header className="ds-aside__header">
                <h3>{texts.template.title}</h3>
            </header>
            {output}
        </>
    );
}

