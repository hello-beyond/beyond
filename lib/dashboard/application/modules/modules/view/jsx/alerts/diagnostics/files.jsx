function FilesDiagnostics({bundle, data, name}) {
    const {texts, model} = useModuleContext();
    const {workspace} = useDSWorkspaceContext();

    let output = [];
    const title = texts.diagnostics[name];
    if (!data.size) return null;

    const onClick = async event => {
        event.preventDefault();
        const target = event.currentTarget;
        let {lineNumber, column} = target.dataset;
        lineNumber = parseInt(lineNumber);
        column = parseInt(column);
        const source = await bundle.getFile(target.dataset.file, 'ts');
        const position = {lineNumber, column};

        workspace.openFile({
            source: source,
            path: source.relative.file,
            processor: 'ts',
            position: position,
            module: model
        });
    };

    data.forEach((item, id) => {
        output = output.concat(item.map((item, k) => {
            return (
                <li key={`${id}.${k}`}>
                    <h6>{item.message}</h6>
                    <div className="item__data">
                        <strong>File</strong>
                        <span
                            data-file={item.file}
                            data-column={item.character}
                            data-line-number={item.line}
                            onClick={onClick}>{item.file}</span>
                    </div>
                    <div className="item__data">
                        <strong>Line</strong>
                        <span>{item.line}</span>
                    </div>
                </li>
            );
        }));
    });

    return (
        <BeyondAlert type="danger">
            <h5>{title}</h5>
            <ul>
                {output}
            </ul>
        </BeyondAlert>
    )
}
