function Theme() {

    const {model, texts: {controls}} = useConfigContext();

    const handleChange = ele => {
        model.theme = ele.value;
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
            <DSSelect options={options} value={model.theme} onSelect={handleChange}/>
        </div>
    )
}