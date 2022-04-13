function DetailItem({item, bundles, type}) {
    const {workspace} = useDSWorkspaceContext();
    const {model} = useModuleContext();
    const [object, setObject] = React.useState(item);
    let output = [];
    if (item.loaded) {
        const {bundle, module: model} = item;
        const connection = model.bundles?.items?.get(bundle.name);
        output.push(<BundleDiagnostics className="interface-item__errors" bundle={connection} key={bundle.id}/>)
    }
    const openBoard = event => {
        workspace.openBoard('module', {label: item.module.name, moduleId: item.module.id});
    };

    const onCheck = async event => {
        event.stopPropagation();

        model.bundles.load(type, item.module.id, item.id);
    };

    return (
        <li className="board__item">
            <header>
                {item.name}
                <div className="item__actions">
                    <DSIconButton onClick={onCheck} className="sm circle secondary" icon="play"/>
                    <DSIconButton onClick={openBoard} className="sm circle secondary" icon="arrowForward"/>
                </div>
            </header>
            {output}
        </li>
    );
}
