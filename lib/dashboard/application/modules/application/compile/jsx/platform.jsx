function Platform() {

    const {environment, texts, onPlatformSelect, platform, changeValue} = useCompilerContext();

    if (!environment) return null;

    if (platform) {
        return (
            <div className="form-section">
                <h4>{texts.platforms.titleSelected}</h4>
                <div className="block-options">
                    <figure className="active" data-property="platform" data-value="mobile">
                        <DSIcon icon="responsive"/>
                        <h4>{texts.platforms[platform].title}</h4>
                        <button
                            data-property="platform" onClick={changeValue}
                            className="btn link">{texts.actions.change}</button>
                    </figure>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="form-section">
                <h4>{texts.platforms.title}</h4>
                <div className="block-options">
                    <figure onClick={onPlatformSelect} data-property="platform" data-value="mobile">
                        <DSIcon icon="mobile"/>
                        <h4>{texts.platforms.mobile.title}</h4>
                        <span>{texts.platforms.mobile.description}</span>
                    </figure>
                    <figure onClick={onPlatformSelect} data-property="platform" data-value="web">
                        <DSIcon icon="responsive"/>
                        <h4>{texts.platforms.web.title}</h4>
                        <span>{texts.platforms.web.description}</span>
                    </figure>
                </div>

            </div>

        </>
    );
}
