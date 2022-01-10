function Diagnostics() {
    const {model} = useModuleContext();

    const output = Array.from(model.bundles.values()).map(bundle => <BundleDiagnostics bundle={bundle}
                                                                                       key={bundle.id}/>);

    return (<>{output}</>)
}
