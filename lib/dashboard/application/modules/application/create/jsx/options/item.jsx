function Item({name}) {
    const {setType, model, texts: {form: texts}} = useCreateAppContext();

    const selectType = event => {
        const target = event.currentTarget;
        const name = target.dataset.name;
        model.type = name;
        setType(name);
    }

    const src = `/images/logos/${name}.png`;
    return (
        <li onClick={selectType} data-algo="11" data-name={name} className="list__item">
            <BeyondImage src={src}/>
            <div className="content">
                <h4>{texts.types[name].title}</h4>
                <p>{texts.types[name].description}</p>
            </div>
        </li>
    )
}
