function GeneralAlerts() {

    const {model} = useModuleContext();
    const total = model.alerts.total;
    // let output = [];

    if (total < 1) return null;

    return (
        <div className="ds-module__alerts-section">
            <AlertBox title="Errors" elements={model.errors} type="error"/>
            <AlertBox title="Warnings" elements={model.warnings} type="warning"/>
        </div>
    );

}