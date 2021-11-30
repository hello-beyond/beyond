function DSDependencyBranch({branch, level = 1}) {
    const styles = {};

    if (level > 0) styles.paddingLeft = `${level * TREE_TABS}px`;
    const {workspace: {openFile}} = useDSWorkspaceContext();

    const onClick = event => {
        event.preventDefault();

        //TODO: @julio check how get corretly the processsor dependency file

        openFile({
            type: 'dependency',
            source: {
                label: branch.label,
                id: branch.item.id,
                code: branch.item.declaration.code,
            },
            processor: 'ts',
            path: branch.item.id,
            external: branch.item.external,
            dependency: branch.item
        });
    };
    return (
        <li className="item" tabIndex="-1">
            <DSItemHeader item={branch} level={level} onClick={onClick}>
                <div className="item__label">
                    <DsIcon icon={`${branch.icon}`}/>
                    <span>{branch.label}</span>
                </div>
            </DSItemHeader>
        </li>
    );
}




