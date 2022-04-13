function PreAside() {
    const bottomNav = [];
    const topNav = [];
    const [items, setItems] = React.useState({top: DSPreAside.top, bottom: DSPreAside.bottom});
    items.top.forEach((item, name) => topNav.push(<PreAsideTab key={name} name={name} tab={item}/>));
    items.bottom.forEach((item, name) => bottomNav.push(<PreAsideTab key={name} name={name} tab={item}/>));

    useBinder([DSPreAside], () => setItems({top: DSPreAside.top, bottom: DSPreAside.bottom}), 'item.added');
    return (
        <section className="ds__pre-aside">
            <ul className="start-list">
                {topNav}
            </ul>
            <ul className="end-list">
                {bottomNav}
            </ul>
        </section>
    );
}
