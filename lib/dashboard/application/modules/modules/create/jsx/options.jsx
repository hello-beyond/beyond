/**
 * STEP 2
 *
 * @returns {JSX.Element|null}
 * @constructor
 */
function Options() {

    const {origin, texts, selectTemplate, model} = useCreateModuleContext();

    const {options} = texts[origin];
    if (!options) {
        return null;
    }

    const onClick = event => {
        const target = event.currentTarget;
        event.stopPropagation();
        event.preventDefault();
        const items =
            target
                .closest('.ds-create-module_template-list')
                .querySelectorAll('.template-list__item');
        Array.from(items).forEach(item => item.classList.remove('active'));
        target.classList.add('active');
        const {template} = target.dataset;

        if (origin === 'templates') model.setTemplate(template);
        else model.setType(template);

        selectTemplate({index: target.dataset.index, template: target.dataset.template});
    };

    const output = options.map(({id, title, description, icon}, index) => {
        icon = 'settings';
        return (
            <section
                data-template={id} data-index={index} onClick={onClick}
                className="template-list__item" key={`${id}-${origin}-${index}`}>
                <DsIcon icon={icon}/>
                <h5>{title}</h5>
                <p>{description}</p>
            </section>
        );
    });

    return (
        <section className="ds-create-module_template-list">
            {output}
        </section>
    );
}
