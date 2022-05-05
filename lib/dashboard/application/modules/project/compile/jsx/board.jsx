export function CompileBoard(props) {
    const [ready, setReady] = React.useState(controller.ready);
    const [selected, setSelected] = React.useState();
    const [fetching, setFetching] = React.useState();
    const [status, setStatus] = React.useState('start');

    const [compiling, setCompiling] = React.useState(null);
    useBinder([controller], () => setReady(controller.ready));

    React.useEffect(() => {
        if (props.specs.id) controller.getApp([props.specs.id]);
        setReady(controller.ready);
    }, [props.specs]);

    if (!ready || props.specs.id !== controller.application?.id) return <DsFetchingBlock/>;
    const {texts, application, error} = controller;

    const Control = status !== 'start' ? Compilation : Start;
    return (
        <CompilerContext.Provider value={{
            setFetching,
            fetching,
            status,
            selected, setSelected,
            setStatus,
            texts,
            application
        }}>
            <DSBoard className="board__compile">

                <header className="board__header">
                    <h4>{texts.title} <small>{application.name}</small></h4>
                </header>
                <Control/>
            </DSBoard>
        </CompilerContext.Provider>

    )
}

