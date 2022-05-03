function Error404() {

    const {texts} = useDSWorkspaceContext();

    if (!texts) return null;

    return (
        <div className="app__empty__container">
            <h2>{texts.application?.error404}</h2>
        </div>
    )
}
