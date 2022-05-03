function BundlesTags() {
    const {model} = useModuleContext();
    const items = [...model.bundles.items.keys()].map(item => <span key={`p-${item}`}
                                                                    className="badge-item">{item}</span>);
    return (<div className="badge-list">{items}</div>)
}
