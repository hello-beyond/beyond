function BundleDiagnostics({bundle, className}) {

    const {texts} = useModuleContext();
    const [diagnostics, setDiagnostics] = React.useState(bundle?.compiler?.diagnostics ?? {});
    const {general, files, overwrites, dependencies} = diagnostics;

    useBinder([bundle], () => {
        setDiagnostics({...bundle.compiler.diagnostics})
    });
    if (!general?.length && !files?.size && !overwrites?.size && !dependencies?.size) {
        return null;
    }
    const attrs = {};
    if (className) attrs.className = 'connections-item__errors';
    return (
        <section {...attrs}>
            <h3>{texts.diagnostics.title}
                <span className="diagnostics__bundle__title">
                        {bundle.name}
                    </span>
            </h3>
            <GeneralDiagnostics data={diagnostics.general}/>
            <FilesDiagnostics name="files" bundle={bundle} data={diagnostics.files}/>
            <FilesDiagnostics name="overwrites" bundle={bundle} data={diagnostics.overwrites}/>
            <FilesDiagnostics name="dependencies" bundle={bundle} data={diagnostics.dependencies}/>
        </section>
    )
}
