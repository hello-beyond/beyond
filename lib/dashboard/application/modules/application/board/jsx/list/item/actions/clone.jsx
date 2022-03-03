function ItemCloneAction({am, onClose}) {
    const [state, setState] = React.useState({modal: false, confirm: false});

    const updateState = newState => setState({...state, ...newState});
    const handleName = event => {
        event.stopPropagation();
        updateState({name: event.currentTarget.value});
    };

    const onClone = async () => {
        try {
            updateState({fetching: true});
            await am.clone(state.name);
            onClose();
        }
        catch (e) {
            console.error(e);
        }
    }

    return (
        <BeyondModal show onClose={onClose} className="xs ds-modal ds-tree__forms">
            <header className="ds-modal_header">
                <section><h4>Duplicar</h4></section>
            </header>
            <div className="ds-modal__content">
                <form onSubmit={onClone}>
                    <input
                        autoComplete="off" required
                        name="name" label={"Nombre del modulo"}
                        placeholder={"mi-modulo | directorio/mi-modulo"}
                        onChange={handleName}/>
                    <div className="actions">
                        <BeyondButton onClick={onClone} className="primary">
                            {state.fetching
                             ? <BeyondSpinner fetching={true} className="on-primary"/>
                             : 'Duplicar'
                            }
                        </BeyondButton>
                    </div>
                </form>
            </div>
        </BeyondModal>
    )
}
