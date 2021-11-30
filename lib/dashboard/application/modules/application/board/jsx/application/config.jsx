export function ApplicationConfig() {
    let {texts: {actions}, application} = useAppContext();
    const model = application?.application;
    const [state, setState] = React.useState({fetching: application?.generating});
    if (!model) return null;
    const {fetching} = state;

    useBinder([model], () => setState({timeUpdated: performance.now()}));
    const generateDeclarations = () => {
        setState({fetching: true});
        window.setTimeout(() => setState({fetching: false}), 1000);
    };
    return (
        <div className="workspace__board ds-board__application application__board">
            <header>
                <h2>{model.name}</h2>
                <div className="actions">
                    <BeeActions bee={model.bee} texts={actions}/>
                    <BeyondButton
                        onClick={generateDeclarations}
                        className="btn primary">
                        {
                            fetching ?
                                <>
                                    <BeyondSpinner className="on-primary"/>
                                    {actions.generatingDeclarations}
                                </> :
                                <>{actions.declarations}</>
                        }

                    </BeyondButton>
                </div>
            </header>
            <Description/>
        </div>
    );
}
