function Dependencies({processor}) {

    const {module, model} = useModuleContext();
    let {texts} = useModuleContext();
    const [open, setOpen] = React.useState(true);

    if (!model.bundle?.hasProcessor('ts')) return null;

    texts = texts.dependencies;

    const update = event => model.updateDependencies();
    const toggleContent = event => setOpen(!open);
    const cls = `processor_block-data two-columns ${!open ? ' hide-block' : ''}`;
    const files = module.dependencies?.files?.map(file => <li key={file}>{file}</li>);

    return (
        <article className="bundle_processor-container">
            <header>
                <div className="col col-left">
                    <h6 className="upper primary-color no-pd">
                        {texts.title}
                    </h6>
                </div>
                <div className="col-right">
                    Files {module.dependencies?.files?.length}
                    <DSIconButton
                        onClick={toggleContent}
                        className="circle expand-icon" icon="expandMore"/>
                </div>
            </header>
            <div className={cls}>
                <div>
                    <h4 className="p2 primary-color bundle-processor_title">
                        {texts.subtitle}
                        <div className="pull-right">
                            <DSIconButton
                                onClick={update} icon="refresh" className="circle small-icon"/>
                        </div>
                    </h4>
                    {module.dependencies.files?.length ?
                        <ul>{files} </ul>
                        :
                        <div>{texts.empty}</div>
                    }
                </div>

            </div>
        </article>

    );

}
