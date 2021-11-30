function FilterBundles({texts}) {
    /**
     * Originally, the headers belonged to application view module
     * and the model represented the application model, for this reason
     * the name is overwritten here
     */
    const {application: model} = useAppContext();
    const {bundles} = model;

    const [active, setActive] = React.useState(model.filterBundle);
    useBinder([model], () => setActive(model.filterBundle));
    const changeFilter = event => {
        const {bundle} = event.currentTarget.dataset;
        model.filterBundle = bundle;
    };

    const filters = bundles.map(bundle => {
        const cls = active === bundle ? "tag tag-active" : "tag"
        return (
            <span key={bundle} className={cls} data-bundle={bundle} onClick={changeFilter}>
                {bundle}
            </span>
        );
    });

    return (
        <div className="actions">
            {filters}
        </div>
    )
}
