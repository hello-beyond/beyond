export function ApplicationConfig() {
    let {texts: {actions}, application} = useAppContext();
    const model = application?.application;
    if (!model) return null;

    const {declarations} = model;
    const {itemsProcessed, total} = declarations;

    const [state, setState] = React.useState({});
    useBinder([model, declarations], () => setState({}));

    const generateDeclarations = () => declarations.update();

    return (
        <div className="workspace__board ds-board__application application__board">
            <header>
                <h2>{model.name}</h2>
                <div className="actions">
                    <BeeActions bee={model.bee} texts={actions}/>
                    <BeyondButton
                        onClick={generateDeclarations}
                        className="btn primary">
                        {!declarations.processing ?
                         <>{actions.declarations}</> :
                         <>
                             <BeyondSpinner className="on-primary"/>
                             {`${actions.generatingDeclarations} ${itemsProcessed}/${total}`}
                         </>
                        }
                    </BeyondButton>
                </div>
            </header>
            <Description/>
        </div>
    );
}
