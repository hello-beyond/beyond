function NewForm({setList, setAddNew}) {

    const {workspace: {application: {favorites}}} = useDSWorkspaceContext();
    let {texts: {favorites: texts}} = useDSTreeContext();
    const handleName = event => {
        event.stopPropagation();
        setList(event.currentTarget.value);
    }
    const onClick = event => {
        event.stopPropagation();
        event.preventDefault();
        setAddNew(false)
    };
    return (
        <>
            <input
                autoComplete="off"
                name="name" label={"Nombre de la lista"}
                placeholder={"Nombre de la lista"} required
                onChange={handleName}/>

            {
                !!favorites.items.size &&
                <div className="text-right">
                    <a href="#" className="link"
                       onClick={onClick}>{texts.actions.select}</a>
                </div>

            }

        </>
    )
}
