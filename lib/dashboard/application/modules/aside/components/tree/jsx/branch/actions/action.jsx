function ActionBranch({action, openConfirmAction, openModalAction}) {
    const {name, icon} = action;
    let {texts} = useDSTreeContext();
    const [showConfirm, toggleConfirm] = React.useState(false);

    const manageAction = event => {
        event.stopPropagation();
        event.preventDefault();
        if (action.confirm) {
            openConfirmAction(action.name)
            toggleConfirm(!showConfirm);
            return;
        }
        /**
         * The control can be passed as a "control" property in the action object
         * or could be defined into the modal objects and being checked by modal boolean property.
         * The last one is the currently way. the control property instead is accepted by legacy.
         */
        if (action.control || action.modal) {
            openModalAction(action);
            return;
        }
        onConfirm();
    };

    const onConfirm = async (event) => {
        toggleConfirm(action.name);
    };

    return (
        <>
            <li key={name} onClick={manageAction} data-action={name}>
                <DSIcon icon={icon} data-element={name}/>
                {texts.actions[name]}
            </li>
        </>

    );
}
