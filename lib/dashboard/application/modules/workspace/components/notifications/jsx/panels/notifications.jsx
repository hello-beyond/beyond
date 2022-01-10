export function NotificationsPanel() {
    const {items, texts} = useDsNotificationContext();
    const output = [];
    items.forEach(item => output.push(<FactoryItem key={`${item.applicationId}-error-${item.id}`} item={item}/>));
    return (
        <>
            {output.length ? <ul>{output}</ul> : <EmptyNotifications/>}
        </>
    )
}
