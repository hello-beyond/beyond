export function BeyondTooltip({specs, className, unmount, children}) {
    const container = document.createElement('span');

    const close = () => {
        document.removeEventListener('click', close);
        unmount(false);
    };
    React.useEffect(() => {
        const body = document.querySelector('body');
        document.addEventListener('click', close);
        body.appendChild(container);
        return () => container.remove();
    }, []);

    const styles = {position: 'absolute', top: `${specs.y}px`, left: `${specs.x}px`};

    return ReactDOM.createPortal(
        <div style={styles} className={className}>
            {children}
        </div>,
        container
    );
}
