export function DSToolbar({items, children}) {

    const [toggle, setToggle] = React.useState(false);
    const cls = "primary";
    return (
        <section className={`ds-toolbar ${cls}`}>
            <div className="toolbar__aside__logo"/>
            <div className="group-items-toolbar">
                {/*<DsBreadcrumb items={items}/>*/}
                <div>h</div>
                <div className="box-notifycation" onClick={() => setToggle(!toggle)}>
                    <div className="icon-button">
                        <DsIcon icon="bell" className="icon-bell"/>
                        {/*<span className="icon-button__badge">{objNotyfications.notification.length}</span>*/}
                    </div>
                    {/*<BoxNotifications toggle={toggle}/>*/}
                </div>

            </div>

        </section>
    );

}
