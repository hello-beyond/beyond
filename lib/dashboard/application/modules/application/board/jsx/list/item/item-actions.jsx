function ItemActions({module}) {
    const [state, setState] = React.useState({modal: false, confirm: false});

    const updateState = newState => setState({...state, ...newState});
    const openModal = () => updateState({modal: true});
    const openConfirm = () => updateState({confirm: true});
    const closeModal = () => updateState({modal: false, fetching: false});
    const closeConfirm = () => updateState({confirm: false, fetching: false});

    return (
        <>
            <BeyondPopover
                options={{modifiers: [{name: 'offset', options: {}}]}}
                placement="bottom-start" className="item-actions"
                target={<DsIcon icon="moreVert" className="actions-icon"/>}>
                <ul>
                    <li onClick={openModal} data-action="rename">
                        <DsIcon icon="edit" data-element="file"/>
                        Duplicar
                    </li>
                    <li onClick={openConfirm} data-action="delete">
                        <DsIcon icon="delete"/>
                        Eliminar
                    </li>
                </ul>
            </BeyondPopover>

            {state.modal && <ItemCloneAction module={module} onClose={closeModal}/>}
            {state.confirm && <ItemDeleteAction module={module} onClose={closeConfirm}/>}
        </>
    )
}