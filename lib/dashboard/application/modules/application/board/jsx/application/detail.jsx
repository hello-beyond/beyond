export function Detail() {
    let {texts, texts: {actions}, application} = useAppContext();
    const model = application?.application;
    const [state, setState] = React.useState({fetching: application?.generating});
    const [processed, setProcessed] = React.useState(application.moduleManager.processed);
    const [showDescription, toggleDescription] = React.useState();
    if (!model) return null;
    const {fetching} = state;

    useBinder([model], () => setState({timeUpdated: performance.now()}));
    useBinder([application.moduleManager], () => setProcessed(application.moduleManager.processed))
    const generateDeclarations = () => {
        setState({fetching: true});
        window.setTimeout(() => setState({fetching: false}), 1000);
    };
    return (
        <div className="application__detail">
            <section className="header">
                <header>
                    <h2>{model.name}</h2>
                    <span className="pathname">{model.path}</span>
                </header>
                <div className="actions">
                    <div className="scanned__section f-center d-flex">
                        <span className="title">{texts.scanner.title}</span>
                        <div className="detail_item">
                            {processed} / {application.moduleManager.total}
                        </div>
                        <DSProcessButton
                            title={texts.actions.scanAll}
                            onClick={application.moduleManager.loadAll}
                            className="on-primary circle" icon="scan"/>
                    </div>
                    <BeeActions bee={model.bee} texts={actions}/>
                    <BeyondButton
                        onClick={generateDeclarations}
                        className="btn primary">
                        {
                            fetching ?
                                <>
                                    <BeyondSpinner className="on-primary"/>
                                    {actions.generatingDeclarations}
                                </> :
                                <>{actions.declarations}</>
                        }

                    </BeyondButton>
                </div>
            </section>
            <span className="link" onClick={() => toggleDescription(!showDescription)}> More details</span>
            {showDescription && <Description/>}
        </div>
    );
}
