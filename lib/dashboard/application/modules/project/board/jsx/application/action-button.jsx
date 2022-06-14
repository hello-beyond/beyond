function DSProcessButton({title, className, icon, onClick}) {

    const [fetching, setFetching] = React.useState();
    if (fetching) {
        return (
            <button className="beyond-icon-button circle button--fetching">
                <BeyondSpinner active className="primary"/>
            </button>
        );
    }

    const action = async event => {
        setFetching(true);
        event.stopPropagation();
        await onClick();
        setFetching(false);
    }
    return (<DSIconButton onClick={action} icon={icon} className={className} title={title}/>);

}
