export function OLDNavigatorBoard() {

    const {application, toggleNavigator, urlNavigator} = useDSWorkspaceContext();
    const refIframe = React.useRef();
    const refResizer = React.useRef();
    const refContainer = React.useRef();
    const [resizing, setResizing] = React.useState();
    const input = React.useRef(null);
    const [url, setURL] = React.useState(urlNavigator ? urlNavigator.url : application.application.url);
    const [value, setValue] = React.useState((![undefined, ''].includes(urlNavigator?.route)) ? urlNavigator?.route : '/');
    const [responsive, setResponsive] = React.useState();
    let placeholder = application.application.url;

    React.useEffect(() => {
        const resizer = refResizer.current;
        const container = refContainer.current;
        let w, x, h, panelWidth;
        const panels = document.querySelector('.panels__container');
        const calculateMove = event => {
            const moveW = event.clientX - x;
            container.style.width = `${w - moveW}px`;
            refIframe.current.style.width = `${w - moveW - 245}px`;
            panels.style.width = `${panelWidth + moveW}px`;
        };
        const stopResize = event => {
            setResizing(false);
            document.removeEventListener('mousemove', calculateMove);
            document.removeEventListener('mouseup', stopResize);
        };
        const resize = event => {
            event.preventDefault();
            const styles = window.getComputedStyle(container);
            const stylesPanel = window.getComputedStyle(panels);
            w = parseInt(styles.width, 10);
            h = parseInt(styles.height, 10);
            panelWidth = parseInt(stylesPanel.width, 10);
            setResizing(true);
            x = event.clientX;
            document.addEventListener('mousemove', calculateMove)
            document.addEventListener('mouseup', stopResize);
        };

        const clean = () => {
            panels.removeAttribute('style');

        }
        resizer.addEventListener('mousedown', resize);
        return clean;
    }, []);

    const close = () => toggleNavigator(false);
    const onChange = event => setValue(event.currentTarget.value !== '' ? event.currentTarget.value : '/');
    const toggleResponsive = () => setResponsive(!responsive);
    const onSearch = (event) => {
        event.preventDefault();
        const route = [undefined, ''].includes(input.current.value) ? event.currentTarget.value : '/';
        setValue(route);
        let url = `${application.application.url}${route}`;
        setURL(url);
    };

    const cls = `ds-navigator__container ${resizing ? ' is-resizing' : ''}`;
    const clsIframe = `ds-navigator__iframe ${responsive ? 'iframe--responsive' : ''}`;

    return (
        <div ref={refContainer} className={cls}>
            <div ref={refResizer} className="ds-navigator__resizer"/>
            <section className="ds-navigator__bar">
                <form className="ds-navigator__form" onSubmit={onSearch}>
                    <BeyondIconButton icon="refresh" onClick={onSearch}/>
                    <input placeholder={placeholder} onChange={onChange} value={value} type="text" ref={input}/>
                    <BeyondIconButton icon="responsive" onClick={toggleResponsive}/>
                    <BeyondIconButton icon="close" onClick={close}/>
                </form>
            </section>
            <div className="ds-navigator__iframe__container">
                <iframe
                    src={url}
                    ref={refIframe} frameBorder="0"
                    className={clsIframe}/>
                <div className="ds-navigator__resizer__shadow"/>
            </div>
        </div>
    )
}
