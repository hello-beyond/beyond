/**
 *
 * @returns {JSX.Element|null}
 * @constructor
 */
function Types() {
    const {texts, selectOrigin, model} = useCreateModuleContext();
    const [origin, setOrigin] = React.useState(model.origin)
    const [type, setType] = React.useState(model.type)
    React.useEffect(() => {
        setType(model.type);
        setOrigin(model.origin);
    }, [model.type, model.origin]);

    const onClick = event => {
        const target = event.currentTarget;
        const items = target.closest('.block_types').querySelectorAll('.link');
        Array.from(items).forEach(item => item.classList.remove('active'));
        target.classList.add('active');
        const {origin} = target.dataset;
        selectOrigin(origin);
        setOrigin(origin);

    };
    const cleanType = () => {
        setOrigin(undefined);
        selectOrigin(undefined);
    }

    if (model.type && model.origin) return null;

    if (!model.origin) {
        return (
            <div className="block_types">
                <figure onClick={onClick} data-origin="bundles" className="link">
                    <DSIcon icon="appTemplate"/>
                    <h4>{texts.types.bundles.title}</h4>
                    <p>{texts.types.bundles.description}</p>
                </figure>
                <figure onClick={onClick} data-origin="templates" className="link">
                    <DSIcon icon="newApp"/>
                    <h4>{texts.types.templates.title}</h4>
                    <p>{texts.types.templates.description}</p>
                </figure>
            </div>
        );
    }

    const icon = origin === 'template' ? 'appTemplate' : 'newApp'
    return (
        <>
            <figure onClick={cleanType} data-origin="bundles" className="block-types__selected">
                <DSIcon icon={icon}/>
                <figcaption>
                    <h4>{texts.types[origin].title}</h4>
                    <p>{texts.types[origin].description}</p>
                </figcaption>
            </figure>
            <Options/>
        </>
    );

}
