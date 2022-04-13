export function StaticBoard({specs}) {
    const {image, type} = specs;
    if (!image) return null;

    const {workspace: {application}} = useDSWorkspaceContext();
    if (!application) {
        console.warn("you are trying to access static files without had selected an application");
        return;
    }
    const urlApp = application.application.url;
    const originalSrc = `${urlApp}${image?.pathname}?original`;
    const overwriteSrc = image.overwrite && `${urlApp}${image?.pathname}`;

    const [src, setSrc] = React.useState({});
    let source = type === 'overwrite' ? overwriteSrc : originalSrc;
    source = src.original === image.id && src.base64 ? src.base64 : source;

    return (
        <StaticContext.Provider value={{type, image, originalSrc, overwriteSrc, src, setSrc}}>
            <div className="ds-panel__static-board">
                <StaticHeader type={type}/>
                <main>
                    <StaticAside/>
                    <section>
                        <BeyondImage src={source}>
                            <figcaption>
                                <StaticActions/>
                            </figcaption>
                        </BeyondImage>
                    </section>
                </main>
            </div>
        </StaticContext.Provider>
    )
}
