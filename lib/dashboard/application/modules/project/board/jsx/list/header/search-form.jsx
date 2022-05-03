function SearchForm() {

    const [showFinder] = React.useState(false);
    const [toFound, setToFound] = React.useState('');
    const {addModule, texts, application: model} = useAppContext();

    const onChange = event => {
        setToFound(event.currentTarget.value);
        model.filterText = event.currentTarget.value;
    };

    const searcher = React.useRef();
    React.useEffect(() => {
        if (showFinder) searcher.current.focus();
    });

    const search = event => {
        event.preventDefault();
        setTitle(toFound);
    };

    const clickForm = event => {
        const target = event.currentTarget;
        if (target.contains(searcher.current)) {
            searcher.current.focus();
        }
    };
    return (
        <div className="modules-list_header">
            <section
                className="header_container">
                <form onSubmit={search} onClick={clickForm}>
                    <input
                        ref={searcher}
                        placeholder={texts.header.searcher}
                        className="modules-list_search-input"
                        onChange={onChange} value={toFound}/>
                </form>
                <a onClick={addModule} className="primary-color link action">{texts.actions.add}</a>
            </section>
            <ContainersFilter/>
        </div>
    )
}