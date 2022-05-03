function GeneralAlerts() {

    const {model} = useModuleContext();

    // let output = [];
    const [total, setTotal] = React.useState(model.alerts.total)
    useBinder([model], () => setTotal(model.alerts.total))

    if (total < 1) return null;

    return (
        <div className="ds-module__alerts-section">
            <AlertBox title="Errors" elements={model.errors} type="error"/>
            <AlertBox title="Warnings" elements={model.warnings} type="warning"/>
        </div>
    );

}
