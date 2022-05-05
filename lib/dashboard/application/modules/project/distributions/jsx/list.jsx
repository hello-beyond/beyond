export const AppDistributions = ({application}) => {
    const [texts, setTexts] = React.useState(module.texts.current.value);
    const [ready, setReady] = React.useState(module.texts.current?.ready);
    const [modal, showModal] = React.useState(false);

    useBinder([module.texts.current], () => {
        setReady(module.texts.current.ready);
        if (module.texts.current.ready) setTexts(module.texts.current.value);
    })
    React.useEffect(() => {
        const onChange = event => console.log(1, `total: `, application.deployment.distributions.size);
        application.deployment.bind('change', onChange);
        return () => application.deployment.unbind('change', onChange);
    });
    if (!ready || !texts) return null;
    if (!application.deployment) {
        console.warn("the application  does not has distributions");
        return null;
    }

    const {deployment: {distributions}} = application;
    const handleClick = () => showModal(!modal);
    const output = [];
    distributions.forEach(data => output.push(<DistributionItem key={data.id} data={data} texts={texts}/>));
    return (
        <div className="container-distributions">
            <div className="header-distributions">
                <h3 className="title-list-distributions">{texts.platform.title}</h3>
                <BeyondButton
                    onClick={handleClick}
                    className="btn primary beyond-button waves-effect">{texts.platform.add}</BeyondButton>
            </div>
            <ul className="list-distributions">
                {output}
            </ul>
            {modal && <ModalDistributions application={application} texts={texts} showModal={showModal}/>}
        </div>
    )
}