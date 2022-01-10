function BundleDiagnostics({bundle}) {

    const {texts} = useModuleContext();
    const [diagnostics, setDiagnostics] = React.useState(bundle?.compiler?.diagnostics ?? {});
    const {general, files, overwrites, dependencies} = diagnostics;

    useBinder([bundle], () => setDiagnostics({...bundle.compiler.diagnostics}));
    if (!general?.length && !files?.size && !overwrites?.size && !dependencies?.size) {
        return null;
    }

    return (
        <>
            <h3>{texts.diagnostics.title}
                <span className="diagnostics__bundle__title">
                        {bundle.name}
                    </span>
            </h3>
            <GeneralDiagnostics data={diagnostics.general}/>
            <FilesDiagnostics name="files" bundle={bundle} data={diagnostics.files}/>
            <FilesDiagnostics name="overwrites" bundle={bundle} data={diagnostics.overwrites}/>
            <FilesDiagnostics name="dependencies" bundle={bundle} data={diagnostics.dependencies}/>
        </>
    )
}
