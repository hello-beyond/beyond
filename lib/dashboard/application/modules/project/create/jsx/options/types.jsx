function ProjectTypes() {

    const {texts: {form: texts}, model: {TYPES, templates}} = useCreateAppContext();

    const outputItems = TYPES.map(item => <Item is="type" key={item.name} name={item.name}/>);
    const outputTemplates = templates.map(item => <Item is="template" key={item.name} name={item.name}/>);
    return (
        <div className="projects__types">
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
