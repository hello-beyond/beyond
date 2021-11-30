function DSSourceBranch({branch, level}) {
    const [branchName, setBranchName] = React.useState(branch.label);
    const [deleted, setDeleted] = React.useState(false);
    const {workspace: {openFile}} = useDSWorkspaceContext();

    if (!branchName) return null;
    const styles = {};
    if (level > 0) styles.paddingLeft = `${level * TREE_TABS}px`;

    useBinder([branch], () => setBranchName(branch.label));
    useBinder([branch], () => setDeleted(true));

    if (deleted) return null;
    /**
     * Opens a file
     * @param event
     */
    const onClick = event => {
        event.preventDefault();
        event.stopPropagation();

        openFile({
            type: 'source',
            source: branch.item,
            path: branch.link,
            module: branch?.module,
            processor: branch.extension
        });
    };
    return (
        <li className="item" tabIndex="-1">
            <DSItemHeader item={branch} level={level} style={styles} onClick={onClick}>
                <div className="item__label">
                    <DsIcon icon={`file.${branch.icon}`}/>
                    <span>{branchName}</span>
                </div>
            </DSItemHeader>
        </li>
    );
}
