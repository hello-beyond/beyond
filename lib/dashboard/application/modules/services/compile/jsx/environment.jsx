function Environment() {

    const {texts, changeValue, onSelectEnvironment, environment} = useCompilerContext();

    if (environment) {
        return (
            <section className="form-section">
                <h4>{texts.environments.titleSelected}</h4>
                <div className="block-options">
                    <figure
                        className="active" data-environment="development">
                        <DsIcon icon="code"/>
                        <h4>{texts.environments.dev.title}</h4>
                        <button
                            data-property="environment" onClick={changeValue}
                            className="btn link">{texts.actions.change}</button>
                    </figure>
                </div>
            </section>
        );
    }

    return (
        <section className="form-section">
            <h4>{texts.environments.title}</h4>
            <div className="block-options">
                <figure onClick={onSelectEnvironment} data-environment="development">
                    <DsIcon icon="code"/>
                    <h4>{texts.environments.dev.title}</h4>
                    <p>{texts.environments.dev.description}</p>
                </figure>
                <figure onClick={onSelectEnvironment} data-environment="production">
                    <DsIcon icon="cloudDone"/>
                    <h4>{texts.environments.prod.title}</h4>
                    <p>{texts.environments.prod.description}</p>
                </figure>
            </div>
        </section>
    );
}