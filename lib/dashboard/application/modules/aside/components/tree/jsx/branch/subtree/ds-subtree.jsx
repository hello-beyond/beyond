/**
 * Represents a subtree elements who has items itself.
 *
 * @param item
 * @param label
 * @param actions
 * @returns {JSX.Element}
 * @constructor
 */
function DSSubTree({branch, label, actions, className, level = 1}) {
    // all sublevels are opened by default
    const [opened, setOpened] = React.useState(!!level > 0);
    const [deleted, setDeleted] = React.useState();

    const cls = `item ds-tree item--subtree ${className ? className : ''}`;
    const titleIcon = opened ? 'folderOpen' : 'folder';
    const styles = {};
    if (level > 0) styles.paddingLeft = `${level * TREE_TABS}px`;
    const onClick = event => {
        event.stopPropagation();
        event.preventDefault();
        setOpened(!opened);
    };

    // if the element is removed then is not rendered
    if (deleted) return null;

    return (
        <li className={cls}>
            <DSItemHeader item={branch} level={level} onClick={onClick}>
                <div style={styles} className="item__label">
                    <DSIcon icon={titleIcon}/>
                    <span>{branch.label}</span>
                </div>
            </DSItemHeader>
            <BranchList opened={opened} level={level + 1} tree={branch}/>
        </li>
    );
}
