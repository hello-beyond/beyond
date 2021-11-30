const Empty = () => {
    const {texts, openDoc} = useDSApplicationsContext();
    const {showAppForm, applications} = useDSWorkspaceContext();
    return (
        <div className="ds-empty-container">
            <header>
                <h2 className="primary-color">{texts.empty.title}</h2>
                <h3 className="h1 on-secondary">{texts.empty.subtitle}</h3>
            </header>

            <div className="ds-empty_buttons-container">
                <BeyondButton onClick={showAppForm} className="btn primary btn-primary icon-on-primary">
                    {texts.actions.create}
                    <DsIcon className="circle" icon="add"/>
                </BeyondButton>
                <div className="break"/>

                {/*<div*/}
                {/*    onClick={() => openDoc('app')}*/}
                {/*    className="mt-15 text-center link">*/}
                {/*    {texts.empty.info}*/}
                {/*</div>*/}
            </div>

            {/*<BoxInfo emptyCars={texts.empty.emptyBox}/>*/}
        </div>
    )
}
