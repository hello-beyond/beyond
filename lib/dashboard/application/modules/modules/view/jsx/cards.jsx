function Cards() {

    const {model, texts} = useModuleContext();
    if (!model.am?.tree.landed) return null;
    const {am} = model;
    return (
        <div className="container-cards">
            <SmallCard
                icon="file.consumer" header={texts.labels.consumers} content={5}/>
            <SmallCard
                icon="file.dependency" header={texts.labels.dependencies} content={5}/>
            <SmallCard
                icon="fileCode" header={texts.labels.totalFiles} content={model.totalFiles}/>
            <SmallCard
                icon="bundle.default" header={texts.labels.bundles}
                content={am.bundles.size}/>
        </div>

    );
}
