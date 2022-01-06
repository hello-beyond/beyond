function Theme() {

    const {editorSettings, texts: {controls}} = useConfigContext();

    const handleChange = ele => {
        editorSettings.theme = ele.value;
    };
    const options = [
        {value: 'vs-light', label: 'vs-light'},
        {value: 'vs-dark', label: 'vs-dark'},
        {value: 'vs-black', label: 'vs-black'},
        {value: 'hc-black', label: 'hc-black'},
    ];

    return (
        <div className="form-column">
            <label>{controls.theme.label}</label>
            <DSSelect options={options} value={editorSettings.theme} onSelect={handleChange}/>
        </div>
    )
}
