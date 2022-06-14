function Diagnostics() {
    const {model} = useModuleContext();

    const output = Array.from(model.bundles.items.values()).map(bundle => {
        return (<BundleDiagnostics bundle={bundle} key={bundle.id}/>);
    });

    return (<>{output}</>);
}
