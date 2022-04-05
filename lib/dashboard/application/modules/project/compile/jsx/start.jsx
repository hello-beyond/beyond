function Start() {
    const {selected, application} = useCompilerContext();
    const distributions = [];
    application.deployment.distributions.forEach(dist =>
        distributions.push(<DistributionItem key={dist.id} data={dist}/>)
    );

    return (
        <>
            <div>
                <h3 className="pd-base">Titulo</h3>
                <ul className={`distributions__list${selected ? ' is-selected' : ''}`}>
                    {distributions}
                </ul>
            </div>
        </>
    )
}