function DeveloperForm({texts, workspace}) {
    const [state, setState] = React.useState({name: "", email: "",});
    const ref = React.useRef();
    const handleInputChange = event => {
        const target = event.currentTarget;
        const data = {};
        data[target.name] = target.value;
        setState(state => ({...state, ...data}));
    }
    const handleSubmit = async e => {
        e.preventDefault();

        setState({...state, fetching: true});
        const container = ref.current;
        container.closest('html').classList.toggle('is-processing');
        container.classList.toggle('is-fetching');
        try {
            window.setTimeout(async () => {
                await workspace.register(state.name, state.email);
                container.classList.toggle('is-fetching');
                window.setTimeout(() => {
                    container.classList.add('ending', 'ending-left');
                    container.closest('html')?.classList.toggle('is-processing');
                    return;
                }, 1000);
            }, 2000);
        }
        catch (e) {
            console.error(e);
        }

        // reset()
    }

    React.useEffect(() => {
        return () => {
            const container = ref.current;
            container.classList?.add('ending', 'ending-left');
            container.closest('html').classList?.toggle('is-processing');
        }
    }, []);

    const disabled = {};

    if (!state.name || !state.email || state.fetching) disabled.disabled = true;

    return (
        <div ref={ref} className="container__early__form">

            <div className="elements__section">
                <div className="logo">
                    <BeyondImage src="/images/logo.png" s alt="logo"/>
                </div>
                <header>
                    <h1>{texts.early.title}</h1>
                    <h4>{texts.early.title2}</h4>

                    {state.error && <h5 className="warning-text">{texts.early.error}</h5>}
                </header>

                <form action="#" onSubmit={handleSubmit}>
                    <div className="form-group">

                        <div className="form-sub-group">
                            <BeyondInput
                                name="name" label={texts.early.inputs.name}
                                required
                                value={state.name}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="form-group">

                        <div className="form-sub-group">
                            <BeyondInput
                                name="email" label={texts.early.inputs.email}
                                required
                                value={state.email}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <div className="form__actions">
                        <BeyondButton type="submit" {...disabled} className="btn secondary">
                            {
                                state.fetching
                                    ? <BeyondSpinner className="on-primary" active/>
                                    : <>{texts.early.action}</>
                            }
                        </BeyondButton>
                    </div>
                    <div className="early__message">
                        {texts.early.message}
                    </div>
                </form>
            </div>


        </div>
    );
}
