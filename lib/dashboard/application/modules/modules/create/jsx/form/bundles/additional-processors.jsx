function AdditionalProcessors({state}) {
    const {model, bundle, texts} = useCreateModuleContext();
    if (bundle !== 'page' && bundle !== 'widget' && bundle !== 'layout') return null;

    const toggleRadio = event => {
        const target = event.currentTarget;
        const newValue = {};
        newValue[target.name] = target.checked;

        if (!target.checked) {
            model.bundle.removeProcessor(target.name);
            return;
        }
        model.bundle.clearProcessors();
        model.bundle.addProcessor(target.name);
    };

    const output = [];
    model.bundle.additionalProcessors.forEach(processor => {
        output.push(
            <div key={processor.id} className="switch-option">
                <BeyondSwitch
                    name={processor.id} onChange={toggleRadio}
                    checked={model.bundle.processors.includes(processor.id)}/>
                <label>{processor.name}</label>
            </div>
        );
    });

    return (
        <div className="item item_switch flex-container">
            <h5 className="link title-separator">
                {texts.processors}
            </h5>
            {output}
        </div>
    )
}