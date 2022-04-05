function DSModuleBranch({branch, level = 1}) {
    const styles = {};
    if (level > 0) styles.paddingLeft = `${(level + 1) * TREE_TABS}px`;

    const [state, setState] = React.useState({});
    const [fetching, setFetching] = React.useState(false);
    const {workspace: {openBoard}} = useDSWorkspaceContext();
    const {moduleManager, setActiveAside} = useDSAsideContext();
    const element = React.createRef();
    const onClick = async event => {

        event.stopPropagation();
        try {
            if (branch.loaded) {
                setState(state => ({...state, opened: !state.opened, totalItems: branch.items.size}));
                return;
            }
            setFetching(true);
            await branch.expand();
            setFetching(false);
            setState(state => ({
                ...state,
                opened: !state.opened,
                items: branch.items,
                totalItems: branch.items.size
            }));
        }
        catch (e) {
            console.error(e);
        }

    }

    const inlineActions = [{
        name: 'open',
        icon: 'arrowForward',
        action: async () => {
            openBoard('module', {label: branch?.module.pathname, moduleId: branch.module.id});
        }
    },
        {
            name: 'setActive',
            icon: 'pinup',
            action: async () => {
                const target = element.current;
                setState({fetching: true});
                target.closest('.ds__aside__detail')?.classList.add('is-fetching');
                target.classList.toggle('item--action-processing')
                await moduleManager.setActive(branch?.module.id);

                target.classList.toggle('item--action-processing');
                target.classList.add('item--action-processed');
                target.closest('.ds__aside__detail ').classList.toggle('is-fetching');

                window.setTimeout(() => {
                    setState({fetching: false});
                    openBoard('module', {label: branch?.module.pathname, moduleId: branch.module.id});
                    setActiveAside('module', {moduleId: branch?.module.id});
                }, 600);

            }
        }];
    useBinder([branch], () => setState({...state, fetching: branch.fetching}));
    useBinder([branch], () => {
        window.setTimeout(() => setState({...state, totalItems: branch.items.size}), 150);
    }, 'branch.added');

    const clsIcon = `tree__icon-open ${state.opened ? ` tree__icon--opened` : ''}`;

    return (
        <li ref={element}
            className={`item ${fetching ? `item--fetching` : ''}`}
            tabIndex="-1">
            <DSItemHeader
                inline={inlineActions}
                fetching={fetching}
                level={level}
                item={branch}
                onClick={onClick}>
                <div className="item__label">
                    <DSIcon className={clsIcon} icon="arrowDropDown"/>
                    <DSIcon icon={`tree.module`}/>
                    <span>{branch.label}</span>
                </div>
            </DSItemHeader>
            {
                !!state.totalItems &&
                <BranchList opened={state.opened} level={level + 1} tree={branch}/>
            }
        </li>

    )
}
