function ItemDeleteAction({am, onClose}) {
    const [state, setState] = React.useState({modal: false});
    const updateState = newState => setState({...state, ...newState});
    const onDelete = async () => {
        try {
            updateState({fetching: true});
            await am.delete();
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
    );
}
