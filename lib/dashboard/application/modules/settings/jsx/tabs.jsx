function Tabs() {
    const {active, tabs, setActive, texts} = useConfigContext();

    const output = Object.keys(tabs).map(key => {
        const onClick = () => setActive(key);
        const attrs = {onClick, key};
        if (active === key) attrs.className = "tab--active";
        return <li {...attrs}>{texts.tabs[key]}</li>
    });
    return (
        <ul className="settings__tabs-list">
            {output}
        </ul>
    )
}
