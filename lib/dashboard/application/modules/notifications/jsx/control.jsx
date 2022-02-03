export const DsNotificationContext = React.createContext(null);
export const useDsNotificationContext = () => React.useContext(DsNotificationContext);

export function NotificationPanel() {
    const [toggle, setToggle] = React.useState(false);

    const {texts, ready, items} = DSNotifications;
    const [state, setState] = React.useState({texts, ready, items});
    const container = React.useRef();
    useBinder([DSNotifications], () => {
        const {ready, items, texts, unread} = DSNotifications;
        setState((state) => ({...state, ready, items, texts, unread}));
    });
    React.useEffect(() => {
        const outsideClick = (event) => {
            const target = event.target;
            const isSameNode = target.isSameNode(container?.current)
            const isContainer = container?.current?.contains(target);
            if (!isSameNode && !isContainer) {
                setToggle(false);
            }
        };
        window.addEventListener("click", outsideClick);
        return () => window.removeEventListener("click", outsideClick);
    }, []);
    if (!state?.ready) return null;

    const {unread} = state;
    const cls = ` ds-notification__button__container ${toggle ? 'is-opened' : ''} ${unread ? ' list--unread' : ''}`;
    return (
        <DsNotificationContext.Provider value={{...state}}>
            <div className="ds-notification__container" ref={container}
                 onClick={() => setToggle(!toggle)}>
                <div className={cls}>
                    <DSIcon icon="bell"/>
                    {
                        state.unread && <span className="ds-notification__badge"/>
                    }
                </div>
                <BoxNotifications toggle={toggle}/>
            </div>
        </DsNotificationContext.Provider>
    )
}
