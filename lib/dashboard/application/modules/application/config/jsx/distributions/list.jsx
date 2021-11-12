const ListDistributions = ({texts}) => {
    const { workspace: { active: { deployment: { distributions } } } } = useDSWorkspaceContext();

    const handleClick = () => setModal(!modal);
    const [modal, setModal] = React.useState(false);

    const output = [];
    distributions.forEach(data => output.push(
        <ItemListDistreibutions key={data.id} data={data} texts={texts} />
    ));

    return (
        <div className="container-distributions">
            <div className="header-distributions">
                <h3 className="title-list-distributions">{texts.title}</h3>
                <BeyondButton onClick={handleClick} className="btn primary beyond-button waves-effect">{texts.add}</BeyondButton>
            </div>
                <ul className="list-distributions">
                    {output.length && output}
                </ul>
            {modal && <ModalDistributions texts={texts} setModal={setModal} />}
        </div>
    )
}

