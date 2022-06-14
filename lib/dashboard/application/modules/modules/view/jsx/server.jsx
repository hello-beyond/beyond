function Server() {

    const {model: {module}} = useModuleContext();
    let {texts} = useModuleContext();
    const [hasBackend, setHasBackend] = React.useState(module.backend);
    const [fetching, setFetching] = React.useState();

    const onCreate = event => {
        setFetching(true);
        module.createBackend();
        window.setTimeout(() => {
            setHasBackend(true);
            setFetching(false);
        }, 2000);

    }
    texts = texts.server;

    return (

        <DSCard header={texts.title}>
            <>
                {
                    hasBackend ?
                        <>
                            <p className="success--message">{texts.created}</p>
                        </>
                        :
                        <>
                            <p>{texts.empty.description}</p>
                            <div className="card__actions">
                                <BeyondButton className="primary" onClick={onCreate}>
                                    {
                                        fetching
                                            ? <>{texts.empty.fetching}<BeyondSpinner className="on-primary"/> </>
                                            : texts.empty.action
                                    }
                                </BeyondButton>
                            </div>

                        </>
                }

            </>
        </DSCard>
    );

}