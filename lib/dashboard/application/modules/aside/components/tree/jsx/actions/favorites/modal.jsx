function AddFavoriteForm({item, toggleModal, setFavorite}) {
    let {texts} = useDSTreeContext();
    const [state, setState] = React.useState({});
    const {fetching, list} = state;
    const props = {};
    if (!list) props.disabled = true;

    const onSave = event => {
        event.stopPropagation();
        event.preventDefault();
        setFavorite(true);
        toggleModal();
        item.addFavorite(list)
    };
    const onClick = event => event.stopPropagation();
    return (

        <BeyondModal
            show
            onClose={toggleModal}
            className="xs ds-modal ds-tree__forms">
            <header onClick={onClick} className="ds-modal_header">
                <section>
                    <h4>{texts.favorites.title}</h4>
                </section>
            </header>
            <div onClick={onClick} className="ds-modal__content">
                <form onSubmit={onSave}>
                    <FavoritesList
                        setFetching={value => setState({fetching: value})}
                        setList={value => setState({list: value})}/>
                    <div className="actions">
                        <BeyondButton{...props} onClick={onSave} className="primary">
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
