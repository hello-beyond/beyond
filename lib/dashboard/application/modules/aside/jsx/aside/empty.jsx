function Empty() {
    const {texts} = useDSAsideContext();

    return (
        <div className="ds-aside__empty">
            <DSIcon icon="project"/>
            {texts.empty}
        </div>
    )
}
