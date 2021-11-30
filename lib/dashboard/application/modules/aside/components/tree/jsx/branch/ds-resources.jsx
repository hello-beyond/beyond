/**
 * Represents a subtree elements who has items itself.
 *
 * @param item
 * @param label
 * @param actions
 * @returns {JSX.Element}
 * @constructor
 */
function DsResourcesBranch({branch, label, actions, className, level = 1}) {
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
            <section className="item__container" onClick={onClick}>
                <div style={styles} className="item__label">
                    <DsIcon icon={titleIcon}/>
                    <span>{branch.label}</span>
                </div>
            </section>
            <BranchList opened={opened} level={level + 1} tree={branch}/>
        </li>
    );
}
