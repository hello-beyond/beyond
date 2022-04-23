/**
 * Shows a modal and includes the control for the action to execute
 * @param action
 * @param item {branch|tree} Element treated, can be a branch or tree
 * @param closeModal
 * @returns {JSX.Element|null}
 * @constructor
 */
export function ModalAction({action, item, closeModal}) {
    if (!action.name) {
        throw Error('the action does not has a name');
    }
    const controls = {
        default: ActionBranch,
        create: DSModalCreate,
        rename: RenameItem,
        static: AddStatic,
        addBundle: AddBundleForm,
    };

    if (!action) return null;
    //TODO: @julio check if is necessary controls object
    const Control = controls[action.name];

    if (!Control) return null;

    const cls = `ds-modal ds-tree__forms${action?.className ? ` ${action.className}` : ' xs'}`;
    return (
        <BeyondModal show onClose={closeModal} className={cls}>
            <div onClick={event => event.stopPropagation()}>
                <Control action={action} item={item} closeModal={closeModal}/>
            </div>
        </BeyondModal>
    );
}
