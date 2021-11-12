function FormLayoutSection({handleChange}) {
    const {application, origin} = useCreateModuleContext();
    if (origin === 'templates') return null;

    const layouts = application.modules.getItems({bundle: 'layout'});
    const items = layouts.map(layout => {
        const id = layout.module.layoutId;
        return <option key={id} data-layout={id}>{id}</option>;
    });

    if (!items.length) return null;

    return (
        <div className="item layout-selection">
            <label htmlFor="">Seleccione el layout</label>
            <select
                name="layout" required
                className="form-select"
                title={`Selecciona un layout`} onChange={handleChange}>
                <option>Seleccione</option>
                {items}
            </select>
        </div>
    );
}
