function DSConsumerBranch({branch, level = 1}) {

    const styles = {};
    if (level > 0) styles.paddingLeft = `${level * TREE_TABS}px`;

    const [errors, setErrors] = React.useState(branch.errors);
    const [state, setState] = React.useState({});
    const [opened, setOpened] = React.useState();
    const {workspace: {openBoard}} = useDSWorkspaceContext();


    useBinder([branch, branch.compiler], () => {
        setErrors(branch.errors);
        setState({
            bundleTree: branch.bundleTree,
            fetching: branch.fetching
        });
    });
    const openErrors = event => {
        openBoard('module', {moduleId: branch.moduleId});
    };
    const onClick = async event => {
        await branch.loadBundle();
        setOpened(!opened);
    }

    const cls = `item__container ${errors > 0 ? '| has__errors' : ''} `;

    return (
        <li className="item" tabIndex="-1">
            <section
                onClick={onClick}
                style={styles} className={cls}>
                <div className="item__label">
                    <ArrowTree opened={opened}/>
                    <DsIcon icon={`${branch.icon}`}/>
                    <span>{branch.label}</span>
                </div>
                <>
                    <DSActions inline={branch.inlineActions} item={branch}/>
                    {errors > 0 &&
                     <div
                         onClick={openErrors}
                         className="item__errors">{branch.errors}</div>
                    }
                </>
            </section>
            {
                state.bundleTree &&
                <BranchList opened={opened} tree={branch.bundleTree} level={level + 1}/>
            }
        </li>
    );
}




