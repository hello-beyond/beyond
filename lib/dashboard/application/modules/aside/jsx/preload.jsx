function AsidePreload() {

    return (
        <aside className="ds__aside hide-detail">
            <section className="ds__pre-aside">
                <ul className="start-list">
                    <li>
                        <DSIconButton icon="folder"/>
                    </li>
                </ul>
                <ul className="end-list">
                    <li><DSIconButton icon="add" disabled/></li>
                    <li><DSIconButton icon="add" disabled/></li>
                    <li><DSIconButton icon="add" disabled/></li>
                    <li><DSIconButton icon="folder" disabled/></li>
                    <li><DSIconButton icon="settings" disabled/></li>
                </ul>
            </section>
            <div className="ds__aside__detail">
                <div/>
            </div>
        </aside>
    )
}
