function MainForm() {

    const {formValues, texts, setValue} = useAddBundleContext();
    const {bundle} = formValues;
    const onHandleChange = (e, item) => {
        e.stopPropagation();
        const target = e.currentTarget;
        const parent = target.closest('ul');
        const selected = parent.querySelector('li.selected');
        if (selected) selected.classList.remove('selected');
        target.classList.add('selected');

        setValue({bundle: item});
    };
    const props = {};
    if (!bundle) props.disabled = true;
    const items = ['widget', 'code', 'start', 'backend'].map((item) => (
        <li key={item} onClick={e => onHandleChange(e, item)}>
            <span className="circle"/>
            <span>{item}</span>
        </li>

    ));

    return (
        <>
            <Header title={texts.widget.title}/>
            <FormAction>
                <ul className="selectable__list">{items}</ul>
            </FormAction>
        </>

    )
}
