function TreeIcon({name, color}) {

    const cls = `icon__background icon-${name}`;
    return (
        <svg className="ds-tree__icon" viewBox="0 0 70 70">
            <rect className={cls} rx="6.2"/>
            <text className="icon__text" transform="translate(8.27 40.68)">
                {name}
            </text>
        </svg>
    );
}