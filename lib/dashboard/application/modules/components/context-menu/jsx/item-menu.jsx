export function ItemMenu({onClick, icon, label}) {

    return (
        <li onClick={onClick}>
            <DSIcon icon={icon}/>
            {label}
        </li>
    )
}
