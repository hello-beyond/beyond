function OsFields() {
    const {platform, texts, onOSSelect, os, changeValue} = useCompilerContext();

    if (platform !== 'mobile') return null;

    if (os) {
        return (
            <div className="form-section">
                <h4>{texts.so.titleSelected}</h4>
                <div className="block-options">
                    <figure className="active" data-property="os" data-value="android">
                        <DsIcon icon="mobile"/>
                        <h4>{texts.so[os].title}</h4>
                        <button
                            data-property="os" onClick={changeValue}
                            className="btn link">{texts.actions.change}</button>
                    </figure>
                </div>
            </div>
        );
    }

    return (
        <div className="form-section">
            <h4>{texts.so.title}</h4>
            <div className="block-options">
                <figure onClick={onOSSelect} data-property="os" data-value="android">
                    <DsIcon icon="mobile"/>
                    <h4>{texts.so.android.title}</h4>
                    <span>{texts.so.android.description}</span>
                </figure>
                <figure onClick={onOSSelect} data-property="os" data-value="ios">
                    <DsIcon icon="ios"/>
                    <h4>{texts.so.ios.title}</h4>
                    <span>{texts.so.ios.description}</span>
                </figure>
            </div>
        </div>
    );
}