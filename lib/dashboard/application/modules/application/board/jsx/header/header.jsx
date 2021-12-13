function Header() {
    let {texts, displayView, setDisplayView} = useAppContext();
    texts = texts.navbar;

    /**
     * Changes the view from list view to grid and vice versa
     * @param event
     */
    const changeView = event => {
        const target = event.currentTarget;
        const {view} = target.dataset;
        //remove all active classes in display button
        const removeActive = item => item.classList.remove('active');
        target.closest('.actions').querySelectorAll('.beyond-icon-button').forEach(removeActive);
        target.classList.add('active');
        localStorage.setItem('beyond.lists.view', view);
        setDisplayView(view);

    }

    return (
        <div className="ds-board__application application-header">
            <div className="left-col">
                <SearchForm/>
            </div>
            <div className="right-col">
                <div className="actions">
                    <DSIconButton
                        onClick={changeView}
                        data-view="grid" icon="thSolid"
                        className={`circle  ${displayView === 'grid' ? 'active' : ''}`}/>
                    <DSIconButton
                        onClick={changeView} data-view="table" icon="barsSolid"
                        className={`circle  ${displayView === 'table' ? 'active' : ''}`}/>
                </div>
                <FilterBundles texts={texts}/>
            </div>
        </div>
    );
}
