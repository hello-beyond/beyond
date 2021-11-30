function DSTreeHeader({title, tree, opened, setOpened}) {

    const onClick = event => {
        event.stopPropagation();
        event.preventDefault();
        setOpened(!opened);
        event.currentTarget.querySelector('.tree__icon-open').classList.toggle('tree__icon--opened')
    };
    const {object} = useDSTreeContext();
    const icon = tree.icon ? tree.icon : tree.type === 'bundle' ? `bundle.${object?.name}` : `tree.${tree.type}`;

    return (
        <DSItemHeader item={tree} onClick={onClick} className="tree__title">
            <div>
                <DsIcon className="tree__icon-open" icon="arrowDropDown"/>
                <DsIcon className="title__bundle-icon" icon={icon}/>
            </div>
            <div>
                <span>{title}</span>
            </div>
        </DSItemHeader>
    );
}
