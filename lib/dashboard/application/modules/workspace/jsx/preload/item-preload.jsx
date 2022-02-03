function PreloadItem() {

    return (
        <div className="ds-item_list">
            <div className="item-info">
                <h4 className="link bold"><BeyondPreloadText color="#fff" height="150px"/></h4>
                <p className="p1"><BeyondPreloadText color="#fff" height="250px"/></p>
                <a className="link" target="_blank">
                    <BeyondPreloadText height="50px"/>
                </a>
                <p className="p2 primary-dark-color"><BeyondPreloadText height="50px" className="primary"/></p>
            </div>
            <div className="right-col actions">
                <DashboardIconButton icon="upload" className="circle" disabled/>
                <DashboardIconButton icon="plus" className="circle" disabled/>
            </div>
        </div>);

}
