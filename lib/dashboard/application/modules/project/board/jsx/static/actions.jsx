function StaticActions() {
    const actions = {name: 'static'};
    const {image, type} = useStaticContext();

    const updateState = update => setState({...state, ...update});
    const [state, setState] = React.useState({modal: false, confirm: false});

    const onDelete = event => {
        event.stopPropagation();
        event.preventDefault();
        updateState({confirm: true})
    };

    const onConfirm = async () => {
        try {
            updateState({confirm: false});
            image.delete(type === 'overwrite');
        }
        catch (e) {
            console.error(e);
            updateState({confirm: false});
        }
    }

    return (
        <>
            <nav className="static__actions">
                <ul>
                    <li><BeyondIconButton
                        data-title="delete" icon="delete" onClick={onDelete}/></li>
                    {/*{!image.overwrite &&*/}
                    {/*<li><BeyondIconButton icon="add" onClick={() => updateState({modal: true})}/></li>*/}
                    {/*}*/}
                </ul>
            </nav>
            {/*{state.modal &&*/}
            {/*<ModalAction item={image} action={actions} closeModal={() => updateState({modal: false})}/>*/}
            {/*}*/}
            {state.confirm &&
             <BeyondConfirmModal
                 show className="xs ds-modal"
                 onConfirm={onConfirm}
                 text="Cambiar texto"
                 onCancel={() => updateState({confirm: false})}/>
            }
        </>
    )
}
