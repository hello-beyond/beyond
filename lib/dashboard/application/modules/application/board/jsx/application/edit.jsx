function EditField({field}) {
    const [edit, setEdit] = React.useState(false);
    let {texts: {application: texts}, application: {application}} = useAppContext();
    const [value, setValue] = React.useState(application[field] ?? '');

    const label = texts.info[field];
    const fieldValue = application[field] ?? texts.info.empty[field];

    const toggleEdit = () => setEdit(!edit);
    const onSubmit = event => {
        event.preventDefault();
        const data = {};
        data[field] = value;
        application.edit(data);
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
                            <BeyondButton className="btn primary"
                                          type="submit">{texts.actions.save}</BeyondButton>
                            <BeyondButton className="secondary rbtn btn-secondary" onClick={toggleEdit}
                                          type="button">{texts.actions.close}
                            </BeyondButton>
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
                <DSIconButton onClick={toggleEdit} icon="edit"/>
            </div>

        </div>
    )
}
