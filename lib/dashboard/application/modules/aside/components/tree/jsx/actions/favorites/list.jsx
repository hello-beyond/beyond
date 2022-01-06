function FavoritesList({setList}) {

    const {workspace: {application: {favorites}}} = useDSWorkspaceContext();
    let {texts: {favorites: texts}} = useDSTreeContext();
    const items = [];
    const [addNew, setAddNew] = React.useState('');

    const showInput = addNew || !favorites.items.size;
    /**
     * If there are no items in the favorites list the form is shown directly
     *
     * @type {string|boolean}
     */

    if (showInput) return <NewForm setList={setList} setAddNew={setAddNew}/>;

    favorites.items.forEach(item => {
        items.push(
            <li key={item.id} onClick={event => {
                event.stopPropagation();
                const target = event.currentTarget;
                const parent = target.closest('ul');
                setList(item.id);
                parent.querySelectorAll('li.selected')
                    .forEach(li => li.classList.remove('selected'));
                event.currentTarget.classList.add('selected');
            }}>
                <span className="circle"/>
                <span>{item.name}</span>
            </li>
        );
    });

    const onAdd = event => {
        event.stopPropagation();
        event.preventDefault();
        setAddNew(true);
        setList('')
    };
    return (
        <>
            <ul className="selectable__list">
                {items}
            </ul>
            <div className="text-right">
                <a className="link" onClick={onAdd}>{texts.actions.new}
                </a>
            </div>
        </>

    );
}
