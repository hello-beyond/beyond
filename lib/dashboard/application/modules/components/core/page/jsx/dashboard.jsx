function IconsList({icons}) {

    const [filterText, setFilterText] = React.useState("");
    const [labelIcon, setLabelIcon] = React.useState('Nombre del ícono');
    const codeCopy = React.useRef();
    const filter = event => {
        setFilterText(event.currentTarget.value);
    }
    icons = icons.filter(item => item.includes(filterText))
    const setName = ({currentTarget: target}) => setLabelIcon(target.dataset.name);
    const copy = event => {
        /* Select the text field */
        const copyText = codeCopy.current;

        /* Copy the text inside the text field */
        navigator.clipboard.writeText(copyText.innerText);
        console.log("copy", copyText.innerText)
    }
    return (
        <>
            <input className="input__search" type="text" onChange={filter}/>
            <pre ref={codeCopy} onClick={copy}>{`<DSIcon  icon="${labelIcon}"/>`}</pre>
            <div className="icon-list">
                {icons.map((iconName, index) => {
                    return (
                        <div key={iconName} className="icon-element"
                             data-name={iconName} onClick={setName}>
                            {iconName}
                            <DSIcon className="" icon={iconName}/>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
