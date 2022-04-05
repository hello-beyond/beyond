function ListDependencies() {
    const {model, texts} = useModuleContext();
    const {bundles} = model;
    const [items, setItems] = React.useState(bundles?.dependencies ? bundles?.dependencies : []);
    const [fetching, setFetching] = React.useState(bundles.fetching);
    useBinder([bundles], () => {
        setItems(items => bundles.dependencies);
        setFetching(bundles.fetching);
    });

    if (bundles.fetching) {
        return <DetailBox title={texts.labels.consumers} fetching={true}/>;
    }

    let output = bundles.dependencies.map(item => (
        <DetailItem
            bundles={bundles}
            type="dependencies"
            key={item.id}
            item={item}
        />
    ));
    if (!output.length) output = [<h4 key="empty__elements">{texts.labels.empty}</h4>];
    return (
        <DetailBox title={texts.labels.dependencies}>
            <ul className="ds-item__list-detail">
                {output}
            </ul>
        </DetailBox>
    );
}
