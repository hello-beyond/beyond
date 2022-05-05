function ServiceActions() {

    let {application} = useAppContext();

    if (!application.backend) return null;

    const [iconApp, setIconApp] = React.useState('av:stop');
    const runAction = React.useRef(null);
    const toggleApp = () => {
        const icon = iconApp === 'av:stop' ? 'av:play' : 'av:stop';
        setIconApp(icon);
        runAction.current.button.classList.toggle('active');
    };

    return (
        <div className="actions">
            <DSIconButton
                ref={runAction}
                onClick={toggleApp} icon={iconApp} className="circle secondary active"/>
        </div>
    )
}
