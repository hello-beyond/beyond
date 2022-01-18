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

    const icons = {stopped: 'play', running: 'restart'};
    const action = bee.status !== 'initialising' && icons[bee.status];
    const stop = async event => {
        event.stopPropagation();
        if (bee.status === 'stopped') return;

        setFetching(true);
        try {
            await bee.stop();
            setFetching(false);
        }
        catch (e) {
            console.error(e);
        }
    };
    const onClick = async event => {
        event.stopPropagation();
        const action = bee.status === 'stopped' ? 'start' : 'restart';
        setFetching(true);
        try {
            await bee[action]();
            setFetching(false);
        }
        catch (e) {
            console.error(e);
        }
    };

    const cls = `circle bee--action action--${action}`;
    return (
        <>
            {fetching ?
             <button className="beyond-icon-button circle button--fetching">
                 <BeyondSpinner active className="primary"/>
             </button>
                      :
             <DSIconButton onClick={onClick} icon={action} className={cls} title={texts[action]}/>
            }
            <DSIconButton
                onClick={stop} icon="stop"
                className="circle bee--action action--stop button--fetching" title={texts.stop}/>
        </>
    )
}