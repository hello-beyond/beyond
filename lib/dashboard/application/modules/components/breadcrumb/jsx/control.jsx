export function DsBreadcrumb({items}) {
    const onClick = event => {
        const target = event.currentTarget;
        event.stopPropagation();
        event.preventDefault();
        beyond.navigate(target.dataset.link);
    };
    const output = items.map(([label, action = onClick], key) => {
        const attrs = {onClick: action};
        return (<li key={key} {...attrs}>{label}</li>);
    });
    return (<ul className="ds-breadcrumb">{output}</ul>);
}
