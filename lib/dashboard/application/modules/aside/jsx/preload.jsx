function AsidePreload() {

    return (
        <aside className="ds__aside hide-detail">
            <section className="ds__pre-aside">
                <ul className="start-list">
                    <li>
                        <DsIconButton icon="folder"/>
                    </li>
                </ul>
                <ul className="end-list">
                    <li><DsIconButton icon="add" disabled/></li>
                    <li><DsIconButton icon="add" disabled/></li>
                    <li><DsIconButton icon="add" disabled/></li>
                    <li><DsIconButton icon="folder" disabled/></li>
                    <li><DsIconButton icon="settings" disabled/></li>
                </ul>
            </section>
            <div className="ds__aside__detail">
                <div/>
            </div>
        </aside>
    )
}
