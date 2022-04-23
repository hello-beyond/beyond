function _DSContextMenu({specs, unmount}) {

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
    });

    return ReactDOM.createPortal(
        <div
            style={{
                position: 'absolute', top: `${specs.y}px`, left: `${specs.x}px`
            }}
            className="ds-context-menu item-actions">
            <ul>
                <li>Una accion</li>
                <li>Otra accion</li>
            </ul>
        </div>,
        container
    );
}
