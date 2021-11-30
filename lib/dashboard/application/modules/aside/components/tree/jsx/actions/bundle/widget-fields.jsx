function WidgetFields({formValues, type, setType, fetching, errorRute, errorName, handleChange}) {
    const {name, route} = formValues;

    const handleChangeSelect = ele => setType(ele.value);
    const options = [
        {value: 'page', label: 'Page'},
        {value: 'layout', label: 'Layout'},
        {value: 'widget', label: 'Widget'},
    ];

    return (
        <div className="group-inputs">
            <BeyondInput
                name="name"
                label="Nombre"
                placeholder="Nombre del bundle"
                value={name}
                onChange={handleChange}
                required
                disabled={fetching}
            />
            {errorName && <span>Ingrese un Nombre</span>}
            <div className="form-select">
                <label>Tipo de widget</label>
                <DSSelect options={options} value={type} onSelect={handleChangeSelect}/>
            </div>
            {type === 'page' &&
             <BeyondInput
                 required
                 name="route"
                 value={route}
                 label="Ruta de la Página"
                 placeholder="Ruta de la Página"
                 disabled={fetching}
                 onChange={handleChange}
             />
            }
            {errorRute && <span>Ingrese una url</span>}
        </div>
    );
}
