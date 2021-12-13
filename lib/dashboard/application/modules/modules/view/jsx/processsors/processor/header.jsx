function ProcessorHeader({toggleContent, processor}) {

    const {texts, module} = useModuleContext();
    //TODO: @julio check declarations
    const declarations = event => {
        if (module.declarations) {
            module.declarations.update();
        }
    }
    return (
        <header className="ds-info__header">
            <div className="col col-left">
                <h6 className="upper primary-color no-pd">
                    {texts.processors[processor.name]}
                </h6>
            </div>
            <div className="col-right">
                {
                    (processor.name === 'ts')
                    &&
                    <span className="btn link" onClick={declarations}>
                        {texts.actions.declarations}
                    </span>
                }
                Files {processor.files.items.length}
                <DSIconButton
                    onClick={toggleContent}
                    className="circle expand-icon" icon="expandMore"/>
            </div>
        </header>
    );
}
