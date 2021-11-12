function PreAside() {

    const bottomNav = [];
    const topNav = [];
    DSPreAside.top.forEach((item, name) => topNav.push(<PreAsideTab key={name} name={name} tab={item}/>));
    DSPreAside.bottom.forEach((item, name) => bottomNav.push(<PreAsideTab key={name} name={name} tab={item}/>));

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
