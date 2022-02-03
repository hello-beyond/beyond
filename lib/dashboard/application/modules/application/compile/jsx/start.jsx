function Start() {
    const {texts, selected, application} = useCompilerContext();
    const dists = [];
    application.deployment.distributions.forEach(dist => {
        dists.push(<DistributionItem key={dist.id} data={dist}/>);
    });

    return (
        <>
            <div>
                <h3 className="pd-base">Titulo</h3>
                <ul className={`distributions__list${selected ? ' is-selected' : ''}`}>
                    {dists}
                </ul>

            </div>

        </>
    )
}
