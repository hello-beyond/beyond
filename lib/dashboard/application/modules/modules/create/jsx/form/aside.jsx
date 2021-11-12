function AsideForm() {
    const {origin, texts, selectOrigin, template} = useCreateModuleContext();
    if (!template) return null;

    const templateData = texts[origin].options[parseInt(template.index)];
    const cleanType = () => selectOrigin(undefined);
    const icon = origin === 'template' ? 'appTemplate' : 'newApp';

    return (
        <aside className="ds-create-module__breadcrumb-form">
            <DsIcon icon={icon}/>
            <div className="breadcrumb">
                <a onClick={cleanType}>{texts.types[origin].title}</a>
                \
                <a onClick={() => selectOrigin(origin)}>{templateData.title}</a>
            </div>
        </aside>
    )
}
