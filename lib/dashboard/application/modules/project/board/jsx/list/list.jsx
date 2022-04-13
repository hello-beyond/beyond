export function ModulesList() {
    const {filterBundle, application} = useAppContext();
    let {texts, displayView} = useAppContext();

    useBinder([application], () => setItems(application?.items));

    if (!application) return null;
    const [items, setItems] = React.useState(application?.items ?? []);

    texts = texts.modules;
    if (!items.length) return <Empty texts={texts}/>;

    const Control = displayView === 'table' ? Item : GridItem;
    const output = items.map(item => <Control am={item} key={item.id}/>);
    const cls = `ds-list list--${displayView}`;

    return (
        <div className="ds-board__list-container ds-module-list__component">
            <div className={cls}>{output}</div>
            {!output?.length && <Empty texts={texts} type={filterBundle}/>}
        </div>
    );
}
