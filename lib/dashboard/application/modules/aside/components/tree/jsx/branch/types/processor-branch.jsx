function DSProcessorBranch({branch, level = 1}) {
    const styles = {};
    if (level > 0) styles.paddingLeft = `${(level + 1) * TREE_TABS}px`;

    const [totalItems, setTotalItems] = React.useState(branch.items?.size);
    const [opened, setOpened] = React.useState();
    const onClick = event => {
        event.stopPropagation();
        setOpened(!opened);
    };
    useBinder([branch], () => window.setTimeout(() => setTotalItems(branch.items.size), 150));
    const clsOpenIcon = `tree__icon-open${opened ? ' tree__icon--opened' : ''}`;

    return (
        <li className="item" tabIndex="-1">
            <DSItemHeader item={branch} level={level} onClick={onClick}>
                <div className="item__label">
                    <DSIcon className={clsOpenIcon} icon="arrowDropDown"/>
                    <DSIcon icon={`processor.${branch.label}`}/>
                    <span>{branch.label}</span>
                </div>
            </DSItemHeader>
            {!!totalItems && <BranchList opened={opened} level={level + 1} tree={branch}/>}
        </li>
    );
}
