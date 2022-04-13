const DistributionItem = ({data}) => {
    const {fetching, texts, selected, setSelected} = useCompilerContext();
    if (selected && selected !== data.id) return null;
    let cls = `item-distribution${selected === data.id ? ' selected' : ''}`
    if (fetching) cls += " is-fetching";
    const onSelect = event => {
        const isSelected = selected ? undefined : data.id;
        setSelected(isSelected);
    }

    const attrs = {className: cls};
    if (!fetching) attrs.onClick = onSelect;
    return (
        <li {...attrs}>
            <div>
                {<h3>{data.name}</h3>}
                <div className="item__description">{texts.platform.label}: <span>{data.platform}</span></div>
                <div className="item__description">{texts.environment}: <span>{data.environment}</span></div>
                <div className="item__description">{texts.platform.port.label}: <span>{data.port}</span></div>
                {data.ts && <div className="item__description">{texts.ts}: <span>{data.ts.compiler}</span></div>}
            </div>

            <div className="col__right">
                <div>
                    {data.ssr && <span className="badge">{texts.ssr}</span>}
                </div>
                <DSIcon icon="check"/>
            </div>
        </li>
    )
}