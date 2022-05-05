function BranchList({tree, className, opened, level = 0}) {
    let clsList = `ds-tree__branches-list tree__list-level-${level}${opened ? '' : ' tree__list--hidden'}`;
    if (className) clsList += ` ${className}`;
    const loop = (item, key) => {
        return <BranchFactory level={level + 1} item={item} key={`factory-${key}-${level}.${item.id}`}/>;
    }
    if (!tree?.items.size) return <EmptyList item={tree}/>;
    return (<ul className={clsList}>{[...tree.items.values()].map(loop)}</ul>);
}
