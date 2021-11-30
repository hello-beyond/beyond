function Empty() {
    const {texts} = useDSAsideContext();

    return (
        <div className="ds-aside__empty">
            <DsIcon icon="project"/>
            {texts.empty}
        </div>
    )
}
