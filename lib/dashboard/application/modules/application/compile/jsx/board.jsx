const CompilerContext = React.createContext();
const useCompilerContext = () => React.useContext(CompilerContext)

export function CompileBoard(props) {
    const [ready, setReady] = React.useState(controller.ready);
    const [finished, setFinished] = React.useState();
    const [selected, setSelected] = React.useState();
    const [fetching, setFetching] = React.useState();
    useBinder([controller], () => setReady(controller.ready));

    React.useEffect(() => {
        if (props.specs.id) controller.getApp([props.specs.id]);
        setReady(controller.ready);
    }, [props.specs]);

    if (!ready || props.specs.id !== controller.application?.id) return <DsFetchingBlock/>;
    const {texts, application, error} = controller;

    const Control = finished ? Finished : Start;
    return (
        <CompilerContext.Provider value={{
            setFetching,
            fetching,
            finished, setFinished,
            selected, setSelected,
            texts,
            application
        }}>
            <DSBoard className="board__compile">
                <header className="board__header">
                    <h2>Compilation <small>{application.name}</small></h2>
                </header>
                <Control/>
                <Footer/>
            </DSBoard>
        </CompilerContext.Provider>

    )
}

