function ContainersFilter() {

    const {application} = useDSWorkspaceContext();

    if (!application) return null;
    const containerRef = React.useRef();
    const [container, setContainer] = React.useState('application');

    const filterContainer = event => {
        //stop propagation is added to prevent the execution of the toggleList function
        //that is added in the onclick event of the container selector
        event.stopPropagation();
        const target = event.currentTarget;
        application.filterContainer = target.dataset.id;
        setContainer(target.dataset.id);
        closeList();
    }

    const toggleList = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const target = containerRef.current;
        target.classList.toggle('opened');

        const action = target.classList.contains('opened') ? 'addEventListener' : 'removeEventListener';
        document[action]('click', checkToClose);
    };

    const closeList = () => {
        containerRef.current.classList.remove('opened');
        document.removeEventListener('click', checkToClose);
    };

    const checkToClose = event => {
        const target = event.target || event.srcElement;
        const parent = target.closest('.header-container-container');
        if (!parent) closeList();
    };

    const libraries = application.containers.map(item => {
        const id = typeof item === 'string' ? item : item[0];
        const label = typeof item === 'string' ? item : item[1];
        return (<div className="header-filter_item" onClick={filterContainer} key={id} data-id={id}>{label}</div>);

    });

    return (

        <section onClick={toggleList}
                 className="header_container app__container-filter">
            <span>{container}</span>
            <BeyondIconButton icon="expandMore" className="circle"/>
            <div ref={containerRef} className="header-filter_list">
                {libraries}
            </div>
        </section>
    )
}
