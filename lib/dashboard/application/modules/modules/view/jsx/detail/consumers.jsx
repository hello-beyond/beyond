function Consumers() {
    const {model, texts} = useModuleContext();
    const {bundlesManager: bundles} = model;
    const [items, setItems] = React.useState(bundles?.consumers ? bundles?.consumers : []);
    const [fetching, setFetching] = React.useState(bundles.fetching);
    useBinder([bundles], () => {
        setItems(items => bundles.consumers);
        setFetching(bundles.fetching);
    });

    if (bundles.fetching) {
        return <DetailBox title={texts.labels.consumers} fetching={true}/>;
    }

    let output = bundles.consumers.map(item => {
        return <DetailItem type="consumers" bundles={bundles} key={item.id} item={item}/>
    });
    if (!output.length) output = [<h4 key="empty__elements">{texts.labels.empty}</h4>];
    return (
        <DetailBox title={texts.labels.consumers}>
            <ul className="ds-item__list-detail">
                {output}
            </ul>
        </DetailBox>
    );
}