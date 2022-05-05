function Start() {
    const {
        selected, finished,
        application,
        setStatus,
        texts
    } = useCompilerContext();
    const distributions = [];

    application.deployment.distributions.forEach(dist =>
        distributions.push(<DistributionItem key={dist.id} data={dist}/>)
    );

    const compile = async event => {
        event.stopPropagation();
        setStatus('compilation')
    }

    return (
        <>
            <div>

                <div className="ds-container two-columns no-m">
                    <section className="card">
                        <h3>{texts.start.title}</h3>
                        <ul className={`distributions__list${selected ? ' is-selected' : ''}`}>
                            {distributions}
                        </ul>
                        {!finished &&
                         <div className="compile__action">
                             <BeyondButton
                                 disabled={!selected} className="btn primary"
                                 onClick={compile}>{texts.actions.compile}</BeyondButton>
                         </div>
                        }
                    </section>

                </div>

            </div>
        </>
    )
}
