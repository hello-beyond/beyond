function BranchList({tree, className, opened, level = 0}) {
    let clsList = `ds-tree__branches-list tree__list-level-${level}${opened ? '' : ' tree__list--hidden'}`;
    if (className) clsList += ` ${className}`;
    const {texts} = useDSAsideContext();
    const loop = (item, key) => <BranchFactory level={level + 1} item={item} key={`factory-${key}}`}/>;
    if (!tree?.items.size) {
        return (
            <ul className={clsList}>
                <li className="empty-tree">{texts.favorites.empty.title}</li>
            </ul>
        )
    }
    return (<ul className={clsList}>{[...tree.items.values()].map(loop)}</ul>);
}
