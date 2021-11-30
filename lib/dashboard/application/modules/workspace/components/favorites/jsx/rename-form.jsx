function FavoritesRenameForm({object, closeModal}) {

    let {texts: {favorites: texts}} = useDSTreeContext();
    const [fetching, setFetching] = React.useState();
    const [name, setName] = React.useState(object.name);

    const props = {};
    if (!name) props.disabled = true;

    const onSave = async event => {
        event.stopPropagation();
        event.preventDefault();
        setFetching(true);
        await object.rename(name);
        window.setTimeout(() => {
            setFetching(false);
            closeModal(true)
        }, 300)
    };
    const onClick = event => event.stopPropagation();
    const handleName = event => {
        event.stopPropagation();
        setName(event.currentTarget.value);
    }

    return (
        <BeyondModal show className="xs ds-modal ds-modal__favorites">
            <header onClick={onClick} className="ds-modal_header">
                <section>
                    <h4>{texts.title}</h4>
                </section>
            </header>
            <div onClick={onClick} className="ds-modal__content">
                <form onSubmit={onSave}>
                    <BeyondInput
                        autoComplete="off"
                        name="name" value={name} required
                        onChange={handleName}/>
                    <div className="actions">
                        <BeyondButton
                            {...props}
                            onClick={onSave}
                            className="primary">
                            {fetching
                                ? <BeyondSpinner fetching={true} className="on-primary"/>
                                : texts.actions.save
                            }
                        </BeyondButton>
                    </div>
                </form>
            </div>
        </BeyondModal>
    )
}