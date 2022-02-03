function TemplateRootTree() {

    let {workspace} = useDSWorkspaceContext();
    const {texts: {tree: {template: texts}}} = useDSAsideContext();

    const {application, global, processors} = workspace?.application?.template;
    const output = [];
    const getTree = (obj, key, title) => <DSTree key={key} title={title} tree={obj}/>;
    output.push(getTree(application, 'app', texts.application));
    output.push(getTree(global, 'globals', texts.global));
    processors.forEach((processor, key) => output.push(getTree(processor, key, key)));

    return (
        <>
            <header className="ds-aside__header">
                <h3>{texts.title}</h3>
            </header>
            {output}
        </>
    );
}

