function NavigatorBar() {
    const {setURL, url, application, toggleResponsive} = useNavigatorContext();
    const input = React.useRef(null);
    const [value, setValue] = React.useState(url ? url.replace(application.application.url, '') : '/');
    let placeholder = application.application.url;
    const onSearch = (event) => {
        event.preventDefault();
        let url = `${application.application.url}${value}`;
        setURL(url);
    };
    const onChange = event => setValue(event.currentTarget.value !== '' ? event.currentTarget.value : '/');

    return (
        <section className="ds-navigator__bar">
            <form className="ds-navigator__form" onSubmit={onSearch}>
                <nav className="left-actions">

                <BeyondIconButton icon="refresh" onClick={onSearch}/>
                </nav>
                <input placeholder={placeholder} onChange={onChange} value={value} type="text" ref={input}/>
                <nav className="right-actions">
                    <BeyondIconButton icon="responsive" onClick={toggleResponsive}/>
                </nav>
            </form>
        </section>
    );
}
