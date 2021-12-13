function ItemActions({module}) {
    const [state, setState] = React.useState({modal: false, confirm: false});
    const [showContextMenu, toggleContextMenu] = React.useState();

    const updateState = newState => setState({...state, ...newState});
    const openModal = () => updateState({modal: true});
    const openConfirm = () => updateState({confirm: true});
    const closeModal = () => updateState({modal: false, fetching: false});
    const closeConfirm = () => updateState({confirm: false, fetching: false});
    const onClick = event => {
        event.stopPropagation();
        event.preventDefault();
        toggleContextMenu({x: event.clientX, y: event.clientY});

    };
    return (
        <>
            <DSIcon icon="moreVert" className="actions-icon" onClick={onClick}/>
            {
                showContextMenu &&
                <DSContextMenu className="item-actions" specs={showContextMenu}
                               unmount={() => toggleContextMenu(false)}>
                    <ul>
                        <li onClick={openModal} data-action="rename">
                            <DSIcon icon="edit" data-element="file"/>
                            Duplicar
                        </li>
                        <li onClick={openConfirm} data-action="delete">
                            <DSIcon icon="delete"/>
                            Eliminar
                        </li>
                    </ul>
                </DSContextMenu>
            }


            {state.modal && <ItemCloneAction module={module} onClose={closeModal}/>}
            {state.confirm && <ItemDeleteAction module={module} onClose={closeConfirm}/>}
        </>
    )
}
