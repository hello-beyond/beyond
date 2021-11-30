export function ItemMenu({onClick, icon, label}) {

    return (
        <li onClick={onClick}>
            <DsIcon icon={icon}/>
            {label}
        </li>
    )
}
