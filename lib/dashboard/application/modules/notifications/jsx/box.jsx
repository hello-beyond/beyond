function BoxNotifications({toggle}) {
    const cls = `ds-notification__list ${toggle ? 'is-opened' : ''}`;
    return (
        <div className={cls}>
            <ProjectsPanel/>
        </div>
    );
}
