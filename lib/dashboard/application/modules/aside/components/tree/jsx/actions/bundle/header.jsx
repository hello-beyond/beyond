const Header = ({title, back}) => {
    return (
        <header className="ds-modal_header">
            {back && <DSIconButton icon="backArrow" onClick={back} className="circle secondary"/>}
            <h4>{title}</h4>
        </header>
    )
}
