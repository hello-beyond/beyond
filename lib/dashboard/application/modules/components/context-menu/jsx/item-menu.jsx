export function ItemMenu({onClick, icon, label}) {

    return (
        <li onClick={onClick}>
            {
                icon ? <DSIcon icon={icon}/> : <span/>
            }

            {label}
        </li>
    )
}
