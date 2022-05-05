function DSBundleBranch({branch, level = 1}) {

    const [totalItems, setTotalItems] = React.useState(branch.items?.size);
    const [opened, setOpened] = React.useState();

    const onClick = async event => {
        event.stopPropagation();
        setOpened(!opened);
    };

    const onAdded = () => {
        window.setTimeout(() => setTotalItems(branch.items.size), 150);
    };
    useBinder([branch], onAdded);
    useBinder([branch], onAdded, 'branch.added');

    const clsIcon = `tree__icon-open ${opened ? ` tree__icon--opened` : ''}`;
    return (
        <li className="item" tabIndex="-1" data-id={branch.id}>
            <DSItemHeader
                item={branch}
                level={level} onClick={onClick}>
                <div className="item__label">
                    <DSIcon className={clsIcon} icon="arrowDropDown"/>
                    <DSIcon icon={`bundle.${branch.bundle.name}`}/>
                    <span>{branch.label}</span>
                </div>
            </DSItemHeader>
            {!!totalItems && <BranchList opened={opened} level={level + 1} tree={branch}/>}

        </li>

    )
}
