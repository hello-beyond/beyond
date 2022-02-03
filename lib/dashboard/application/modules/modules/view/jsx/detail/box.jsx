function DetailBox({children, title, fetching}) {
    const [toggle, setToggle] = React.useState(false);
    const icon = toggle ? 'arrowDropDown' : 'arrowDropUp';

    return (
        <article className="board-box">
            <header className="flex-container flex-space-x" onClick={() => setToggle(!toggle)}>
                <h3>{title}</h3>
                {
                    fetching ?
                        <DSIconButton> <BeyondSpinner active className="on-primary"/> </DSIconButton>
                        :
                        <div className="actions"><DSIconButton className="circle secondary" icon={icon}/></div>
                }

            </header>
            {toggle && children}
        </article>
    );
}
