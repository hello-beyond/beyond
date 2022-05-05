function PreloadItem() {

    return (
        <div className="ds-item_list">
            <div className="item-info">
                <h4 className="bold title-app">
                    <BeyondPreloadText height={`10px`} width={`30px`}/>
                </h4>
                <p className="p1">
                    <BeyondPreloadText height={`7px`} width={`50px`}/></p>
                <a className="link">
                    <BeyondPreloadText height={`7px`} width={`100px`}/>
                </a>
                <p className="p2 primary-text">
                    <BeyondPreloadText height={`7px`} width={`300px`} className="primary"/>
                </p>
            </div>
            <div className="right-col actions">
                <DashboardIconButton icon="upload" className="circle" disabled/>
                <DashboardIconButton icon="plus" className="circle" disabled/>
            </div>
        </div>);

}
