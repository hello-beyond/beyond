const ConfigContext = React.createContext();
const useConfigContext = () => React.useContext(ConfigContext);

export function ConfigBoard() {

    const [state, setState] = React.useState({});
    const [controller, setController] = React.useState();
    const {fetching, update} = state;

    React.useEffect(() => {
        const controller = new Controller();
        setController(controller);
        setState(state => ({...state, controller, update: performance.now()}));
        const onChange = () => setState({...state, update: performance.now()});
        controller.bind('change', onChange);
        return () => controller.unbind('change', onChange);
    }, []);

    const onSave = async event => {
        event.stopPropagation();
        event.preventDefault();
        await controller.model.save();
        setState({...state, fetching: true});
        window.setTimeout(() => setState({...state, fetching: false}), 300);
    };

    if (!update || !controller?.ready) return null;
    const {model, texts} = controller;
    const { unpublished } = model;
    const attrs = {};
    if (!model.unpublished) attrs.disabled = true;

    const onChange = event => {
        event.stopPropagation();
        const target = event.currentTarget;
        try {
            model[target.name] = target.value;
        }
        catch (e) {
            console.warn('this is not a configuration property');
        }
    };

    return (
        <ConfigContext.Provider value={{ model, unpublished, texts }}>
            <div className="workspace__board">
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
                                   value={model.fontSize}
                                   placeholder={texts.controls.fontSize.placeholder}/>
                        </div>
                        <div className="settings-item">
                            <label htmlFor="">{texts.controls.wordWrap.label}</label>
                            <BeyondSwitch name="wordWrap" value={model.wordWrap} onChange={onChange}/>
                        </div>
                    </section>

                    {
                        (model.unpublished) &&
                        <footer className="settings__actions">
                            <BeyondButton {...attrs} onClick={onSave} className="btn primary">
                                {texts.actions.save}
                            </BeyondButton>
                        </footer>
                    }
                </form>
                <ListDistributions texts={texts.distribution}/>
            </div>
        </ConfigContext.Provider>

    )
}
