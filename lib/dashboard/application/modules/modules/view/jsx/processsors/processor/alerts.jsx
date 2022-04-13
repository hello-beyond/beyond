function ProcessorAlerts({warnings, errors}) {

    if (!warnings || !errors) return null;
    let alerts = [];
    const {texts} = useModuleContext();

    const print = (item, key, type, identifier = undefined) => {
        return (
            <li key={`module-${key}-${type}`}>
                <DSIcon className={`icon-${type}`} name={type}/>
                <div className="content">
                    {identifier && <strong>{identifier} </strong>}
                    <span>{item}</span>
                </div>
            </li>
        );
    }

    const showAlerts = (warnings, errors, key) => {
        const wmessages = warnings.map((warning, id) => print(warning, `${key}-${id}`, 'warning'));
        const emessages = errors.map((errors, id) => print(errors, `${key}-${id}`, 'error'));
        alerts = alerts.concat(wmessages, emessages);
    };

    showAlerts(errors.processor, warnings.processor, "processor");
    showAlerts(errors.files, warnings.files, "files");
    showAlerts(errors.overwrites, warnings.overwrites, "overwrites");

    if (!alerts.length) return null;
    return (
        <div className="processor_block-data separator  ">
            <h4 className="p2 primary-color">{texts.processors.alerts}</h4>
            <ul className="list-icon list-unstyled grid-center-y">
                {alerts}
            </ul>
        </div>
    )
}
