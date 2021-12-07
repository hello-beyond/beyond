export function BeyondTooltip({specs, className, unmount, children}) {
    const container = document.createElement('span');
    const ref = React.useRef();
    const [position, setPosition] = React.useState(specs)
    const close = () => {
        document.removeEventListener('click', close);
        unmount(false);
    };
    React.useEffect(() => {
        const body = document.querySelector('body');
        document.addEventListener('click', close);
        body.appendChild(container);
        const {offsetWidth, offsetHeight} = ref.current;
        const tWidth = offsetWidth + specs.x;
        const tHeight = offsetHeight + specs.y;
        const newPosition = {};
        if (tWidth > window.innerWidth) ref.current.style.left = `${position.x - offsetWidth}px`;
        if (tHeight > window.innerHeight) ref.current.style.top = `${position.y - offsetHeight}px`;
        return () => {
            document.removeEventListener('click', close);
            container.remove();
        }
    }, []);

    const styles = {position: 'absolute', top: `${position.y}px`, left: `${position.x}px`};

    return ReactDOM.createPortal(
        <div style={styles} ref={ref} className={className}>
            {children}
        </div>,
        container
    );
}
