export const NavigatorContext = React.createContext();
export const useNavigatorContext = () => React.useContext(NavigatorContext);

export function NavigatorBoard({specs}) {

    const {workspace} = useDSWorkspaceContext();

    const [state, setState] = React.useState({});
    const refContainer = React.useRef();

    const resizing = false;
    const cls = `ds-navigator__container ${resizing ? ' is-resizing' : ''}`;

    React.useEffect(() => {
        const application = workspace.getApplication(specs.applicationId);
        const url = specs?.url ? specs.url : application.application.url;

        const onChange = () => {
            setState({...state, url, application, ready: application.ready});
        }

        application.bind('change', onChange);
        if (application.ready) onChange();
        return () => application.unbind('change', onChange);
    }, []);

    if (!state.ready) return <Preload/>;

    return (
        <NavigatorContext.Provider value={{
            toggleResponsive: () => setState({...state, responsive: !state.responsive}),
            setURL: (newUrl) => setState({...state, url: newUrl}),
            responsive: state.responsive,
            url: state.url,
            application: state.application,
        }}>
            <div ref={refContainer} className={cls}>
                <NavigatorBar/>
                <Iframe/>
            </div>
        </NavigatorContext.Provider>
    )
}
