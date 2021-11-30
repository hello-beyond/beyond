/**
 * TODO: @julio action and logic is also existing in application board, analyze if can be integrated as a unique exported component
 * @param bee
 * @param texts
 * @returns {JSX.Element|null}
 * @constructor
 */
function BeeActions({bee, texts}) {
    const [fetching, setFetching] = React.useState(bee?.status === 'initialising');
    if (!bee) return null;
    const icons = {stopped: 'play', running: 'stop'};
    const action = bee.status !== 'initialising' && icons[bee.status];
    if (fetching) {
        return (
            <button className="beyond-icon-button circle button--fetching">
                <BeyondSpinner active className="primary"/>
            </button>
        );
    }
    const onClick = async event => {
        event.stopPropagation();
        const action = bee.status === 'stopped' ? 'start' : 'stop';
        setFetching(!fetching);
        try {
            await bee[action]();
            setFetching(!fetching);
        }
        catch (e) {
            console.error(e);
        }
    }
    const cls = `circle bee--action action--${action}`;
    return (<DsIconButton onClick={onClick} icon={action} className={cls} title={texts[action]}/>)
}
