export function ModulesList({displayView}) {
    const {filterBundle, application} = useAppContext();
    let {texts} = useAppContext();

    const [items, setItems] = React.useState(application.items);
    useBinder([application], () => setItems(application.items))
    texts = texts.modules;

    if (!items.length) return <Empty texts={texts}/>;

    const Control = displayView === 'table' ? Item : GridItem;
    const output = items.map(item => <Control module={item} key={item.id}/>);
    const cls = `ds-list list--${displayView}`;

    return (
        <div className="ds-module-list__component">
            <div className={cls}>{output}</div>
            {!output?.length && <Empty texts={texts} type={filterBundle}/>}
        </div>
    );
}
