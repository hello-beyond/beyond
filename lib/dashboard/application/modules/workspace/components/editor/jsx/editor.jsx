export function EditorView(props) {
    const {panel, editor} = props;
    const [isUnpublished, setIsUnpublished] = React.useState();
    const vs = React.useRef();
    useBinder([editor], () => setIsUnpublished(editor.unpublished));
    React.useEffect(() => {
        editor.init(vs.current);
        vs.current.addEventListener('click', panel.setActive)
        return () => {
            vs.current.removeEventListener('click', panel.setActive)
            editor.removeListeners();
        };
    }, []);

    const cls = `ds-editor__container ${isUnpublished ? ' is-unpublished' : ''} `;
    return (
        <div className={cls}>
            {isUnpublished &&
                <>
                    <div className="ds-editor__icons">
                        <DSIcon title="tienes cambios por guardar" icon="save"/>
                    </div>
                </>
            }
            <div className="vs-editor" ref={vs}/>
        </div>
    )
}