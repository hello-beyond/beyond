/**
 *
 * @param fetching
 * @param className
 * @param item {mixed} Can be branch or Tree element.
 * @param inline
 * @param onClick
 * @param level
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */

function DSItemHeader({fetching, className, item, inline, onClick, level, children}) {
    const styles = {};
    if (level > 0) styles.paddingLeft = `${(level + 1) * TREE_TABS}px`;

    const [state, setState] = React.useState({});
    /**
     * Hede we keep using multiples useState beacause the functions to open modal and confirm need to be
     * passed to children components.
     */
    const [showContextMenu, toggleContextMenu] = React.useState();
    const [modalAction, setModalAction] = React.useState(false);
    const [confirmAction, setConfirmAction] = React.useState(false);
    const {workspace: {contextMenu}} = useDSWorkspaceContext();
    let {texts} = useDSTreeContext();
    const ref = React.useRef();
    useBinder([contextMenu], () => {
        if (!ref.current === contextMenu.target) return;
        if (showContextMenu) return;
        toggleContextMenu({x: contextMenu.event.clientX, y: contextMenu.event.clientY});
    }, `fired.item-item-${level}.${item.label}`);
    useBinder([contextMenu], () => toggleContextMenu(false), 'closed');
    const actions = [];
    const onConfirm = async () => {
        try {
            await item[confirmAction]();
            setConfirmAction(false);
        }
        catch (e) {
            console.error("error", e);
        }
    }

    item?.actions?.forEach((action) => actions.push(
        <ActionBranch key={action.name}
                      openConfirmAction={setConfirmAction}
                      openModalAction={setModalAction} action={action} item={item}/>
    ));

    const cls = className ?? 'item__container';
    return (
        <section ref={ref} onClick={onClick}
                 data-context={`item-item-${level}.${item.label}`} style={styles}
                 className={cls}>
            {children}
            {
                fetching
                    ? <BeyondSpinner active className="on-primary"/>
                    : <DSInlineActions inline={inline} setModalAction={setModalAction} item={item}/>
            }

            {
                showContextMenu &&
                <DSContextMenu unmount={toggleContextMenu} specs={showContextMenu}>
                    <ul>{actions}</ul>
                </DSContextMenu>
            }
            {modalAction &&
            <ModalAction item={item} action={modalAction} closeModal={() => setModalAction(false)}/>
            }
            {
                confirmAction &&
                <BeyondConfirmModal
                    show className="xs ds-modal"
                    onCancel={() => setConfirmAction(false)} onConfirm={onConfirm}
                    text={texts.confirm[confirmAction]}/>
            }
        </section>
    )
}
