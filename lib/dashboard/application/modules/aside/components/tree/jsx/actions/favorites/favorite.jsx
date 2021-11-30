/**
 * Favorite icon button
 *
 * It is used by sources branches and subtree branches
 * @param item
 * @returns {JSX.Element|null}
 * @constructor
 */
export function FavoriteAction({item}) {

    const [state, setState] = React.useState({isFavorite: item.isFavorite});
    const {showModal, confirmDelete, isFavorite} = state;
    let {texts: {favorites: texts}} = useDSTreeContext();
    const toggleFavorite = event => {
        event.stopPropagation();
        event.preventDefault();
        const newState = item.isFavorite ? {confirmDelete: true} : {showModal: true};
        setState({...state, ...newState});
    };
    const favoriteIcon = isFavorite ? 'bookmark' : 'bookmark-border'

    useBinder([item], () => setState({...state, isFavorite: true}));
    const onConfirm = async () => {
        await item.removeFavoriteItem();
        setState({...state, isFavorite: false, confirmDelete: false})
    };
    const toggleModal = () => setState(state => ({...state, showModal: !showModal}));

    return (
        <>
            <DsIcon className="bookmark-icon" onClick={toggleFavorite} icon={favoriteIcon}/>
            {showModal
             && <AddFavoriteForm
                 item={item}
                 toggleModal={toggleModal}
                 setFavorite={() => setState({isFavorite: true})}/>}
            {
                confirmDelete &&
                <BeyondConfirmModal
                    show className="xs ds-modal"
                    onCancel={() => setState({confirmDelete: false})}
                    onConfirm={onConfirm}
                    text={texts.favorites.actions.delete}/>
            }
        </>
    );
}
