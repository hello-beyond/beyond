const EmptyNotifications = () => {
    const {texts} = useDsNotificationContext();
    return (
        <div className="empty__item">
            <span>{texts.empty}</span>
        </div>
    )
}
