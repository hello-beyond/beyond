export function Iframe({specs}) {

    const {responsive, url} = useNavigatorContext();
    const refIframe = React.useRef();
    const [fetching, setFetching] = React.useState(true);
    React.useEffect(() => {
        refIframe.current.addEventListener('load', () => {
            try {
                console.log("TODO OK");
                setFetching(false)
            }
            catch (e) {
                console.log("HUBO ERROR");
            }
        })
    }, [url]);

    const clsIframe = `ds-navigator__iframe ${responsive ? 'iframe--responsive' : ''}`;
    return (
        <div className="ds-navigator__iframe__container">
            {(fetching) && <IframeFetching/>}
            <iframe
                src={url}
                ref={refIframe} frameBorder="0"
                className={clsIframe}/>
            <div className="ds-navigator__resizer__shadow"/>
        </div>
    )
}
