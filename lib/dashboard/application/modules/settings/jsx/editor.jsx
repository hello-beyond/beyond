function EditorSettings() {
    const {texts, editorSettings} = useConfigContext();
    const attrs = {};
    if (!editorSettings.unpublished) attrs.disabled = true;

    const [, setState] = React.useState({});
    const onSave = async event => {
        event.stopPropagation();
        event.preventDefault();
        await editorSettings.save();
        setState({});
    };
    const onChange = event => {
        event.stopPropagation();
        const target = event.currentTarget;
        try {
            editorSettings[target.name] = target.value;
        }
        catch (e) {
            console.warn('this is not a configuration property');
        }
    };

    return (
        <form className="form" onSubmit={onSave}>
            <section>
                <header>
                    <h3>{texts.title} </h3>
                </header>
                <Theme/>
                <div className="settings__item">
                    <label htmlFor="">{texts.controls.fontSize.label}</label>
                    <input type="text"
                           onChange={onChange}
                           name="fontSize"
                           value={editorSettings.fontSize}
                           placeholder={texts.controls.fontSize.placeholder}/>
                </div>
                <div className="settings-item">
                    <label htmlFor="">{texts.controls.wordWrap.label}</label>
                    <BeyondSwitch name="wordWrap" value={editorSettings.wordWrap} onChange={onChange}/>
                </div>
            </section>
            {
                editorSettings.unpublished &&
                <footer className="settings__actions">
                    <BeyondButton {...attrs} onClick={onSave} className="btn primary">
                        {texts.actions.save}
                    </BeyondButton>
                </footer>
            }
        </form>
    )
}