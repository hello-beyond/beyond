function Cards() {

    const {model, texts} = useModuleContext();
    const [total, setTotal] = React.useState({
        consumers: model?.bundles?.consumers?.length ?? 0,
        dependencies: model?.bundles?.dependencies?.length ?? 0,
        files: model.totalFiles,
        bundles: model?.am.size ?? 0
    })
    if (!model.am?.tree.landed) return null;

    useBinder([model.bundles], () => {
        setTotal({
            consumers: model.bundles.consumers.length,
            dependencies: model.bundles.dependencies.length,
            files: model.totalFiles,
            bundles: model.bundles.items.size
        })
    });
    const {consumers, dependencies, files, bundles} = total;
    return (
        <div className="container-cards">
            <SmallCard
                icon="file.consumer" header={texts.labels.consumers} content={consumers}/>
            <SmallCard
                icon="file.dependency" header={texts.labels.dependencies} content={dependencies}/>
            <SmallCard
                icon="fileCode" header={texts.labels.totalFiles} content={files}/>
            <SmallCard
                icon="bundle.default" header={texts.labels.bundles}
                content={bundles}/>
        </div>

    );
}
