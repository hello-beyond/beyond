function View() {
  const [value, setValue] = React.useState({ search: "" });
  const [state, setState] = React.useState(false);
  //Referencial a la alerta;
  const alert = React.useRef();
  //Referencia al input de busqueda;
  const InputRef = React.useRef(null);

React.useEffect(()=>{
  //AutoFoucus para le input de busqueda, se asi asi y no con el atributo autoFocus de los input 
  // ya qu asi sucede antes de que este disponible por lo que sucede un mal efecto al ocurrir de esa manera
  InputRef.current?.focus();
}, []);

  //funcion para llenarr el valor del input de  busqueda
  const handleInputChange = e => {
    setValue({
      ...value,
      search: e.target.value,
    });
  };
  //funcion que remueve la alerta
  const removeAlert = () => {
    alert.current.classList.remove("active");
    setState(!state);
  };
//Funcion que copia el texto, se le pasa el texto que se desea copiar 
  const copyText = text => {
    navigator.clipboard.writeText(text);
    setState(!state);
  };
  // useLayoutEffect ya que se trabaja con el DOM  y es nesesario que este disponible al ejecutar lo que hay en el inteior
  React.useLayoutEffect(() => {
    if (!state) return;
    alert.current.classList.add("active");
    window.setTimeout(() => {
      removeAlert();
    }, 1500)
  }, [state]);

  // Ordenando los icons en orden alfabetico segun el nombre
  const IconOrder = ICONS.sort((a, b) => {
    if(a.name > b.name) return 1;
    if(a.name < b.name) return -1;

    return 0;
  });

  // LO ICONS a mostrar estara determinado si se esta buscando o no
  const BeyondIcons = value.search === "" ?
  IconOrder.map((icon) => {
      return (
        <div onClick={() => copyText(icon.name)} className="card-icons" key={icon.id}>
          <BeyondIcon icon={icon.icon} />
          <span className="icon-name">{icon.name}</span>
        </div>
      );
    })
    : IconOrder.filter((filtro) => filtro.name.toLowerCase().includes(value.search.toLowerCase())).map((icon) => {
      return (
        <div onClick={() => copyText(icon.name)} className="card-icons" key={icon.id}>
          <BeyondIcon icon={icon.icon} />
          <span className="icon-name">{icon.name}</span>
        </div>
      );
    });

  return (
    <div className="beyond-icons-container">
      <div className="search-icon">
        {/* No uso el BeyondInput porque queria dar un referencia al input pero como el BeyondInput ya la usa no puedo hacerlo*/}
        <input ref={InputRef} value={value.search} name="search" type="text" onChange={handleInputChange} placeholder="Buscar icons" />
        <BeyondIcon icon="searchSolid" />
      </div>
      <div className="icons-container">
        {BeyondIcons}
      </div>
     {/*  Alerta de cuando se ha copiado un nombre de icon*/}
      <AlertIcon alert={alert} removeAlert={removeAlert} />
    </div>
  );
}