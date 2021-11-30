function Blocks() {

    const [items, templates] = useModel();
    const {texts: {form: texts}} = useCreateAppContext();

    const outputItems = items.map(item => <Item key={item} name={item}/>);
    const outputTemplates = templates.map(item => <Item key={item} name={item}/>);
    return (
        <div className="applications__types">
            <h4 className="">{texts.types.titles.empty}</h4>
            <ul className="items__list">
                {outputItems}
            </ul>
            <h4 className="block_types-title">{texts.types.titles.templates}</h4>
            <ul>
                {outputTemplates}
            </ul>
        </div>
    );
}
