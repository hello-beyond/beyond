function AddBundleForm({setShowModal, module}) {
    const {texts: {tree: {bundle: texts}}} = useDSAsideContext();

    const [widget, setWidget] = React.useState(false);
    const [type, setType] = React.useState("widget");
    const [fetching, setFetching] = React.useState(false);
    const [bundle, setBundle] = React.useState(undefined);
    const [submitWithWidget, setSubmitWithWidget] = React.useState({});
    const [widgetChange, setWidgetWidgetChange] = React.useState(false);

    const [formValues, handleChange, reset, route, errorName, setErrorName, errorRute, setErrorRute] = useForm({
        name: '', route: '',
    });

    const props = {};
    if (!bundle) props.disabled = true;

    const onClose = () => {
        setBundle(undefined);
        setShowModal(false);
    };
    const onClick = e => {
        e.stopPropagation();
    }
    const onSave = async e => {
        e.preventDefault();
        e.stopPropagation();

        if (widget) {
            setWidgetWidgetChange(true);
            setWidget(false);
            return;
        }

        if (widget && name.length === 0) {
            setErrorName(true);
            return;
        }

        setFetching(true);
        if (widgetChange) {
            if (type === 'page') {
                if (route.length === 0) {
                    setErrorRute(true);
                    return;
                }
                setSubmitWithWidget({name: name, type: type, route: route});
                await module.addBundle({bundle: submitWithWidget});
            }
            else {
                setSubmitWithWidget({name: name, type: type});
                await module.addBundle({bundle: submitWithWidget});
            }
            setFetching(false);
            reset();
            onClose();
            return;
        }

        await module.addBundle({bundle: bundle});
        setFetching(false);
        reset();
        onClose();
    };
    const onHandleChange = (e, item) => {
        e.stopPropagation();
        const target = e.currentTarget;
        const parent = target.closest('ul');
        setBundle(item);
        parent.querySelectorAll('li.selected')
            .forEach((li) => li.classList.remove('selected'));
        e.currentTarget.classList.add('selected');
        setWidget(item === 'widget');
    };

    const items = [];
    ['widget', 'code', 'start', 'backend'].forEach((item) => {
        items.push(
            <li key={item} onClick={e => onHandleChange(e, item)}>
                <span className="circle"/>
                <span>{item}</span>
            </li>
        );
    });

    const toReturn = () => {
        setWidgetWidgetChange(false);
        setWidget(false);
    };

    const text = widget ? texts.actions.next : texts.actions.save;

    const CONTROLS = {
        widget: WidgetFields,
        default: WidgetFields
    };
    const Control = widgetChange ? WidgetFields : CONTROLS.default;

    return (
        <BeyondModal show className="xs ds-modal ds-tree__forms" onClose={onClose}>
            <header onClick={onClick} className="ds-modal_header">
                <section>
                    <h4>{widgetChange ? texts.widget.title : texts.title}</h4>
                </section>
            </header>
            <div onClick={onClick} className="ds-modal__content">
                <form onSubmit={onSave}>
                    {widgetChange ?
                     <Control
                         setType={setType} type={type} fetching={fetching}
                         formValues={formValues} errorRute={errorRute}
                         errorName={errorName} handleChange={handleChange}/>
                                  :
                     <ul className="selectable__list">{items}</ul>
                    }

                    <div className={widgetChange ? 'actions between' : 'actions end'}>
                        {widgetChange &&
                        <BeyondButton className="boton-left" onClick={toReturn}>
                            Volver
                        </BeyondButton>
                        }
                        <BeyondButton {...props} onClick={onSave} className="primary roundell">
                            {fetching ? <BeyondSpinner fetching={true} className="on-primary"/> : text}
                        </BeyondButton>
                    </div>
                </form>
            </div>
        </BeyondModal>
    );
}
