function DSModalCreate({action, item, closeModal}) {

    const {texts} = useDSTreeContext();

    const [state, setState] = React.useState({label: ''});

    const {error, fetching, label} = state;

    const props = {};
    if (fetching) props.disabled = true;

    const actions = texts.actions;

    const actionTexts = texts.itemActions[action.name];
    const onChange = event => {
        event.stopPropagation();
        setState({...state, label: event.currentTarget.value});
    };
    const onSave = async event => {
        event.preventDefault();
        event.stopPropagation();
        setState({fetching: true});

        try {
            const response = await item.create(label);
            setState({fetching: false, label: ''});
            response.error ? setState({error: response.message}) : closeModal();
        }
        catch (e) {
            setState({fetching: false});
            setState({...state, error: e.message});
        }
    };

    return (
        <>
            <header className="ds-modal_header">
                <section>
                    <h4>{actionTexts.title}</h4>
                </section>
            </header>
            <div className="ds-modal__content">
                {error &&
                 <BeyondAlert type="error">
                     {texts.errors.hasOwnProperty(error) ? texts.errors[error] : texts.errors.default}
                 </BeyondAlert>
                }
                <form onSubmit={onSave}>
                    <label>{actionTexts.label}</label>
                    <input
                        name="name"
                        value={label}
                        placeholder={actionTexts.placeholder}
                        onChange={onChange} type="text"
                        className="form-control"/>
                    <div className="actions">
                        <BeyondButton {...props} onClick={onSave} className="primary">
                            {fetching
                                ? <BeyondSpinner fetching={true} className="on-primary"/>
                                : actions.create
                            }
                        </BeyondButton>
                    </div>
                </form>
            </div>
        </>
    );
}
