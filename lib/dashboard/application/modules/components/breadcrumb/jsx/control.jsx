export function DsBreadcrumb({items, current}) {

    const onClick = event => {
        const target = event.currentTarget;
        event.stopPropagation();
        event.preventDefault();
        beyond.navigate(target.dataset.link);
    };

    const output = items.map(([label, link], key) => {
        const attrs = {onClick: onClick};
        if (current === link) {
            attrs.className = 'current';
            delete attrs.onClick;
        }
        return (<li key={key} {...attrs} data-link={link}>{label}</li>);
    });

    return (<ul className="ds-breadcrumb">{output}</ul>)
}