function DSSubtreeActions({branch, onDelete, onAdd}) {
    const {texts, showCreate, actions, object} = useDSTreeContext();
    const [showConfirmDelete, setShowConfirmDelete] = React.useState();
    const onCreate = event => {
        event.stopPropagation();
        showCreate({branch: branch});
    }
    const showDelete = event => {
        event.preventDefault();
        event.stopPropagation();
        if (!object && !actions?.subtree?.delete) {
            console.warn("the object manager of the tree was not correctly passed ");
            return;
        }
        setShowConfirmDelete(true);
    }
    const onConfirmDelete = event => {

        if (actions?.subtree?.delete) {
            actions.subtree.delete(branch.path, branch.specs);
            onDelete(true)
            return;
        }

        object.deleteFolder(branch.path);
        onDelete(true)
        //onDelete();
    }
    const hideDelete = event => setShowConfirmDelete(false);
    return (
        <nav className="branch__actions">
            <FavoriteAction item={branch}/>
            <BeyondPopover
                placement="right-start"
                className="item-actions"
                target={<DSIcon icon="moreVert"/>}>
                <ul>
                    {
                        (actions.create !== false) &&
                        <li onClick={onCreate} data-element="folder">
                            <DSIcon icon="file"/>
                            {texts.createFile}
                        </li>
                    }

                    <li onClick={showDelete} data-element="folder">
                        <DSIcon icon="delete"/>
                        {texts.delete}
                    </li>
                </ul>
            </BeyondPopover>
            {
                showConfirmDelete &&
                <BeyondConfirmModal
                    show className="md ds-modal"
                    onCancel={hideDelete} onConfirm={onConfirmDelete}
                    text={'¿Desea eliminar el directorio?'}/>
            }
        </nav>
    );
}
