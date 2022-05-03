function StaticOverwrite() {
    const {image, overwriteSrc, setSrc} = useStaticContext();
    const [sourceFile, setSourceFile] = React.useState({});

    let src = overwriteSrc ?? undefined;
    src = sourceFile.original === image.id ? sourceFile.base64 : src;
    if (src) return (<li><BeyondImage src={src}/></li>);

    const regex = /\/\/[a-zA-z]*\.[a-zA-z]*/;
    const specs = {
        id: image.id.replace(regex, ''),
        type: 'overwrite',
        image: image.relative.file.replace('\\', '/')
    };
    const onLoadFile = images => {
        // the uploader returns a map with the images loaded
        const base64 = [...images.values()][0];
        const specs = {original: image.id, base64: base64.src};
        setSourceFile(specs);
        setSrc(specs);
    };
    const onLoadEnd = response => {
        if (!response.status) return;
        const specs = {};
        specs.origin = image.relative.file.replace('\\', '/');
        specs.overwrite = response.data[0].pathname;
        image.upload(specs);
    };

    return (
        <li>
            <Uploader url='/uploader' specs={specs} multiple={true} onLoadFile={onLoadFile} onLoadEnd={onLoadEnd}>
                <BeyondIconButton data-tipy-content="Agregar overwrite" className="primary" icon="add"/>
            </Uploader>
        </li>
    );
}