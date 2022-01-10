function BoxNotifications({toggle}) {
    const {items, texts} = useDsNotificationContext();

    const cls = `ds-notification__list ${toggle ? 'is-opened' : ''}`;


    return (
        <div className={cls}>
            <ApplicationsPanel/>
            <NotificationsPanel/>

        </div>
    );
}
