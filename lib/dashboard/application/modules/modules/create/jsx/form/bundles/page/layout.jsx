function FormLayoutSection({handleChange, disabled}) {
    const {application, origin, texts} = useCreateModuleContext();
    if (origin === 'templates') return null;

    const layouts = application.modules.getItems({bundle: 'layout'});
    const items = layouts.map(layout => {
        const id = layout.module.layoutId ?? layout.module.name;
        return <option key={id} data-layout={id}>{id}</option>;
    });

    if (!items.length) return null;

    return (
        <div className="item layout-selection">
            <label htmlFor="">{texts.page.layout}</label>
            <select
                name="layout"
                required
                {...disabled}
                className="form-select"
                title={`Selecciona un layout`} onChange={handleChange}>
                <option>{texts.page.input.layout.placeholder}</option>
                {items}
            </select>
        </div>
    );
}
