/**
 * Component to show inline actions in a branch or tree.
 *
 * The actions must be defined in the inline Actions property of the module.
 * The component manages the functionality to show modal or a confirm modal if it's required
 * @param {object} item  Tree or Branch object
 * @param {boolean} fetching defines if the element it's consulting or processing data
 * @param {function} setModalAction it's passed by header object to manage the modal functionality
 * @param {object} inline additional inlines actions defined from the item directly
 * @returns {JSX.Element}
 * @constructor
 */
function DSActions({item, fetching, setModalAction, inline = []}) {

    const onClickInlineAction = (event, action) => {
        event.preventDefault();
        event.stopPropagation();
        if (action.modal) {
            setModalAction(action);
            return;
        }
        if (action.action) action.action();
        else item[action.name]();
    };

    inline = item.inlineActions?.concat(inline);
    let inlineOutput = inline?.map(action =>
        <DSIcon key={`inline-${action.name}`} icon={action.icon} onClick={event => onClickInlineAction(event, action)}/>
    );
    if (fetching) inlineOutput = <BeyondSpinner active className="primary"/>
    return (
        <div className="branch__actions">
            {inlineOutput}
            {item.favoriteAction !== false && <FavoriteAction item={item} openModalAction={setModalAction}/>}
        </div>
    )
}
