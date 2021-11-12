const LibraryDescription = ({library, texts, actions}) => {

    const [edit, setEdit] = React.useState(false);
    const [editDescription, setEditDescription] = React.useState(library.description);
    const [error, setError] = React.useState();

    const storeDescription = async (event) => {
        event.preventDefault();
        let response = await actions.storeDescription(editDescription);
        if (response) setEdit(false);
        else setError('Error al cambiar la descripción');
    };

    const onChangeDescription = (event) => {
        setEditDescription(event.target.value);
        if (error) setError(undefined);
    };

    const onFocusDescription = (event) => event.target.select();

    const description = library.description ? library.description : texts.actions.editDescription;

    if (edit) return (
        <form className="library-description" onSubmit={storeDescription}>
            <BeyondTextarea name="description" placeholder="Description" value={editDescription} autoFocus={true}
                            onChange={onChangeDescription} error={error}
                            onFocus={onFocusDescription} disabled={library.publishing}/>
            <DashboardIconButton type='submit' name="send" disabled={library.publishing}/>
        </form>
    );

    return (
        <div className="library-description">
            <h3>{description}</h3>
            <DashboardIconButton name="edit" onClick={() => setEdit(true)}/>
        </div>);
};