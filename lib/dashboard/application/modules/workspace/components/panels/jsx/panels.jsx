export function Panels() {

    const {ready, workspace} = useDSWorkspaceContext();
    const {panels} = workspace;
    const output = [];
    const container = React.useRef();
    const [state, setState] = React.useState({});
    useBinder([panels], () => {
        setState({...state, items: panels.items})
    });
    if (!ready) return <Preload/>;
    const pushPanel = (item, id) => <PanelView specs={item.specs} panel={item} key={`panel-${id}`}/>;

    panels.items.forEach((item, id) => output.push(pushPanel(item, id)));
    const addPanel = event => {
        panels.add();
    };

    const {vertical} = state;
    const panelsCss = {};
    const prop = vertical ? 'gridTemplateRows' : 'gridTemplateColumns';
    panelsCss[prop] = `repeat(${panels.items.size}, minmax(0, 1fr))`;
    const cls = `panels__container ${vertical ? 'panels--vertical' : ''}`;

    return (
        <WorkspacePanelsContext.Provider value={{
            addPanel,
            panels: panels,
            panel: panels.active
        }}>
            <div ref={container} style={panelsCss} className={cls}>
                <nav className="ds-panels__actions">
                    <DSIconButton onClick={addPanel} icon="splitView" title="Split editor"/>
                </nav>
                {output}
            </div>
        </WorkspacePanelsContext.Provider>

    )
}
