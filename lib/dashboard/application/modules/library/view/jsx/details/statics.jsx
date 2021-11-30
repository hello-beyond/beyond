function Statics({library, texts}) {
    const {statics} = library;
    if (!statics) return null;

    const port = library.servers.value[0].port;
    const items = [];

    const [openCollapse, setOpen] = React.useState(false);
    const open = (event) => {
        const target = event.currentTarget;
        const element = statics[target.dataset.index];
        window.open(`http://localhost:${port}/${element.filename}`, '_BLANK');
    };

    const icon = openCollapse ? 'arrowDropDown' : 'arrowDropUp';
    let clsContainer = 'detail';
    if (openCollapse) clsContainer += ' opened';
    statics.map((file, index) => {
        items.push(
            <div className="element-item" data-index={index} onClick={open} key={index}>
                {file.filename}
            </div>
        );
    });

    return (
        <div className={clsContainer}>
            <header>
                <DashboardIcon className="detail-icon" name="archive"/>
                <div className="title-content">
                    <h3>{texts.titles.static}</h3>
                </div>
                <DashboardIconButton onClick={() => setOpen(!openCollapse)} className="detail-icon" icon={icon}/>
            </header>
            <BeyondScrollContainer className="collapse-container">
                {items}
            </BeyondScrollContainer>
        </div>
    );
}