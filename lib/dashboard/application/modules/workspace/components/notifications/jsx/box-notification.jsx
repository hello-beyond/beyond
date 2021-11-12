function BoxNotifications({toggle}) {
    const {items, texts} = useDsNotificationContext();

    const cls = `ds-notification__list ${toggle ? 'is-opened' : ''}`;
    const output = [];
    items.forEach(item =>
        output.push(<NotificationItem key={`${item.applicationId}-error-${item.id}`} item={item}/>)
    );

    return (
        <div className={cls}>
            <header>
                <h5 className="title">{texts.title}</h5>
            </header>

            {output.length ? <ul>{output}</ul> : <EmptyNotifications/>}
        </div>
    );
}
