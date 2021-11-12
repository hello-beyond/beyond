function EditField({field}) {
    const [edit, setEdit] = React.useState(false);
    const {model: {module}, texts} = useModuleContext();
    const [value, setValue] = React.useState(module[field] ?? '');

    const label = texts[field];
    const fieldValue = module[field] ?? texts.empty[field];

    const toggleEdit = () => setEdit(!edit);
    const onSubmit = event => {
        event.preventDefault();
        module[field] = value;
        module.saveField(field, value);
        setEdit(!edit);
    };
    const onEdit = event => {
        const target = event.currentTarget;
        setValue(target.value);
    };

    if (!fieldValue) {
        return (
            <div className="item-formation">
                <div>{label}</div>
                <form onSubmit={onSubmit} className="form-group">
                    <input autoComplete="off" onChange={onEdit} name={field} defaultValue={value}/>
                </form>
            </div>
        )
    }

    if (edit) {
        return (

            <div className="item-information item-information--edit">
                <div>{label} </div>
                <form onSubmit={onSubmit} className="form-group">
                    <input autoComplete="off" onChange={onEdit} name={field} defaultValue={value}/>
                    <FadeIn>
                        <div className="form__actions">
                            <BeyondButton className="btn primary" type="submit">Guardar</BeyondButton>
                            <BeyondButton className="secondary rbtn btn-secondary" onClick={toggleEdit}
                                          type="button">Cerrar</BeyondButton>
                        </div>

                    </FadeIn>
                </form>
            </div>

        );
    }

    return (
        <div className="item-information">
            <div>{label}</div>
            <div className="description-item">
                <p className="p1 p-0">{fieldValue}</p>
                <DsIconButton onClick={toggleEdit} icon="edit"/>
            </div>

        </div>
    )
}
