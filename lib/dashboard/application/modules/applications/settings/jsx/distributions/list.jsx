const ListDistributions = () => {
    const {selected, texts} = useAppsSettingsContext();

    if (!selected.deployment) {
        console.warn("the application selected does not has distributions");
        return null;
    }
    const {deployment: {distributions}} = selected;
    const handleClick = () => showModal(!modal);
    const [modal, showModal] = React.useState(false);
    React.useEffect(() => {
        const onChange = event => console.log(1, `total: `, selected.deployment.distributions.size);
        selected.deployment.bind('change', onChange);
        return () => selected.deployment.unbind('change', onChange);
    })
    const output = [];
    distributions.forEach(data => output.push(<DistributionItem key={data.id} data={data} texts={texts}/>));

    return (
        <div className="container-distributions">
            <div className="header-distributions">
                <h3 className="title-list-distributions">{texts.title}</h3>
                <BeyondButton
                    onClick={handleClick}
                    className="btn primary beyond-button waves-effect">{texts.add}</BeyondButton>
            </div>
            <ul className="list-distributions">
                {output}
            </ul>
            {modal && <ModalDistributions texts={texts} showModal={showModal}/>}
        </div>
    )
}

