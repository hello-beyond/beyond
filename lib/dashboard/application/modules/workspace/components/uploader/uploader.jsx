export function Uploader({onLoadFile, onLoadEnd, name = 'images', multiple, children, specs}) {
    const btn = React.useRef();
    const [uploader, setUploader] = React.useState();
    const {workspace: {application}} = useDSWorkspaceContext();
    const url = `${application.application.url}/uploader`;

    React.useEffect(() => {
        const model = new JidaUploader({
            type: 'image',
            name: 'images',
            params: specs,
            url: url,
            input: {name: name, multiple: !!multiple}
        });

        model.create(btn.current);
        const onLoad = () => {
            [...model.files.items.values()][0]
            onLoadFile(model.files.items);
        };
        const loadend = async () => {
            const response = await model.publish();
            onLoadEnd(response);
        };

        model.bind('file.loaded', onLoad);
        model.bind('loadend', loadend);
        setUploader(model);
    }, [url, multiple]);

    return <span ref={btn}>{children}</span>;
}
