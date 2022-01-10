function Consumers() {
    const {model, texts} = useModuleContext();
    const {bundlesManager: bundles} = model;
    const [items, setItems] = React.useState(bundles?.consumers ? bundles?.consumers : []);

    return null;
    if (!bundles) return null;
    useBinder([bundles], () => {
        // console.log(8)
        setItems(items => bundles.consumers);
    }, []);
    // console.log(9, items, bundles.consumers);
    return (
        <section>
            <h3>{texts.labels.consumers}</h3>
            <ul>
                {
                    items.map(module => {
                        return (
                            <li key={module.id} className="board__item">
                                {module.name}
                                <div className="item__actions">
                                    <DSIconButton className="sm circle primary" icon="refresh"/>
                                    <DSIconButton className="sm circle primary" icon="arrowRight"/>
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </section>
    );
}
