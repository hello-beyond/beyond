function ItemDeleteAction({module, onClose}) {
    const [state, setState] = React.useState({modal: false});

    const updateState = newState => setState({...state, ...newState});
    const onDelete = async () => {
        try {
            updateState({fetching: true});
            await module.delete();
            onClose();
        }
        catch (e) {
            console.error(e);
        }
    }

    return (
        <BeyondConfirmModal
            show className="xs ds-modal" text={'¿Desea eliminar el modulo?'}
            onConfirm={onDelete} onCancel={onClose}/>
    )
}