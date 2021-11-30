function Texts() {

    const {module, model} = useModuleContext();
    let {texts} = useModuleContext();
    const [open, setOpen] = React.useState(true);

    texts = texts.txt;

    const update = event => model.updateDependencies();
    const toggleContent = event => setOpen(!open);
    const cls = `processor_block-data two-columns ${!open ? ' hide-block' : ''}`;
    /**
     * The texts property represents a bundle in beyond and contains a txt processor,
     * Is necessary to access to the bundle object that is available into the value property.
     * Later we need to get the processor to loop the files.
     *
     * @type {*}
     */
    const files = module?.texts.value?.processors.get('txt')?.files;

    return (
        <article className="bundle_processor-container">
            <header>
                <div className="col col-left">
                    <h6 className="upper primary-color no-pd">
                        {texts.title}
                    </h6>
                </div>
                <div className="col-right">
                    <DsIconButton
                        onClick={toggleContent}
                        className="circle expand-icon" icon="expandMore"/>
                </div>
            </header>
            <div className={cls}>
                {
                    !module.texts.has ?
                        <div>
                            <h4>{texts.empty.title}</h4>
                            <p>{texts.empty.description}</p>
                        </div>
                        :
                        <>
                            <ProcessorAlerts processor={module.texts.value}/>
                            <div className={cls}>
                                <List list={files} title="Files"/>
                            </div>
                        </>

                }
            </div>
        </article>

    );

}