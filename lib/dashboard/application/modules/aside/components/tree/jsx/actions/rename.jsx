function RenameItem({item, closeModal}) {
    let {texts} = useDSTreeContext();
    const {actions} = texts.files

    const [state, setState] = React.useState({label: item.label});

    const {label, fetching, error} = state;
    const props = {};
    if (fetching) props.disabled = true;

    const onClick = () => setState({label: label});
    const onSave = event => {
        event.preventDefault();
        event.stopPropagation();
        setState({fetching: true});
        if (item.rename(label)) {
            closeModal(false);
            setState({fetching: false});
            return;
        }
        setState({error: true});
    };
    const onChange = event => {
        event.preventDefault();
        event.stopPropagation();
        setState({label: event.currentTarget.value});
    }

    return (
        <>
            <header onClick={onClick} className="ds-modal_header">
                <section>
                    <h4>{texts.rename}</h4>
                </section>
            </header>
            <div onClick={onClick} className="ds-modal__content">
                <form onSubmit={onSave}>
                    <label>{texts.rename} file {item.label}</label>
                    <input name="name" value={label} onChange={onChange} type="text" className="form-control"/>
                    <div className="actions">
                        <BeyondButton {...props} onClick={onSave} className="primary">
                            {fetching ? <BeyondSpinner fetching={true} className="on-primary"/> : actions.save}
                        </BeyondButton>
                    </div>
                </form>
            </div>
        </>
    );
}

