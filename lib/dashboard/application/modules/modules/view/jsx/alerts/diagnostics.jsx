function Diagnostics() {
    const {model, texts, controller} = useModuleContext();

    const output = [];

    model.bundles.forEach(bundle => {
        const {diagnostics, id} = bundle;
        const {general, files, overwrites, dependencies} = diagnostics;
        if (!general?.length && !files?.size && !overwrites?.size && !dependencies?.size) {
            return null;
        }
        output.push(
            <React.Fragment key={id}>
                <h3>{texts.diagnostics.title}
                    <span className="diagnostics__bundle__title">
                        {bundle.name}
                    </span>
                </h3>
                <GeneralDiagnostics data={diagnostics.general}/>
                <FilesDiagnostics name="files" bundle={bundle} data={diagnostics.files}/>
                <FilesDiagnostics name="overwrites" bundle={bundle} data={diagnostics.overwrites}/>
                <FilesDiagnostics name="dependencies" bundle={bundle} data={diagnostics.dependencies}/>
            </React.Fragment>
        );
    });

    return (<>{output}</>)
}
