export const DsNotificationContext = React.createContext(null);
export const useDsNotificationContext = () => React.useContext(DsNotificationContext);

export function NotificationPanel() {
    const [toggle, setToggle] = React.useState(false);

    const {texts, ready, items} = DSNotifications;
    const [state, setState] = React.useState({texts, ready, items});
    useBinder([DSNotifications], () => {
        const {ready, items, texts, unread} = DSNotifications;
        setState((state) => ({...state, ready, items, texts, unread}));
    });

    if (!state?.ready) return null;
    const {unread} = state;
    const cls = ` ds-notification__button__container ${toggle ? 'is-opened' : ''} ${unread ? ' list--unread' : ''}`;
    return (
        <DsNotificationContext.Provider value={{...state}}>
            <div className="ds-notification__container"
                 onClick={() => setToggle(!toggle)}>
                <div className={cls}>
                    <DsIcon icon="bell"/>
                    {
                        state.unread && <span className="ds-notification__badge"/>
                    }
                </div>
                <BoxNotifications toggle={toggle}/>
            </div>
        </DsNotificationContext.Provider>
    )
}
