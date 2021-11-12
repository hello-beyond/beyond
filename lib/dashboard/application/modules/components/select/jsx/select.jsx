export function DSSelect({options, value, onSelect}) {
    const [opened, toggle] = React.useState();
    const [label, setValue] = React.useState(value)
    const icon = opened ? 'arrowDropUp' : 'arrowDropDown';
    const map = new Map();

    const onClick = event => {
        event.preventDefault();
        toggle(!opened);
    };
    const select = event => {
        event.stopPropagation();
        event.preventDefault();
        toggle(!opened);
        const target = event.currentTarget;
        const ele = map.get(target.dataset.value);
        setValue(ele.label);

        if (onSelect) onSelect(ele);
    }
    const items = options.map(item => {
        map.set(item.value, item);
        return (
            <div key={item.value} onClick={select}
                 data-value={item.value} className="option">
                {item.label}
            </div>
        );
    });

    const cls = `form__select ${opened ? ' opened' : ''}`;
    return (
        <div className={cls} onClick={onClick}>
            <div className="label">
                {label ?? 'Seleccione...'}
                <BeyondIcon icon={icon}/>
            </div>
            <div className="form__select__options">
                {items}
            </div>
        </div>
    )
}