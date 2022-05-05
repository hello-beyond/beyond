const DistributionItem = ({data, texts}) => {

    const {
        selected
    } = useCompilerContext()
    const cls = `item-distribution${selected.name === data.name ? ' item--selected' : ''}`;
    return (
        <li className={cls}>
            <div>
                {<h2>{data.name}</h2>}
                <div className="item__description">{texts.platform.label}: <span>{data.platform}</span></div>
                <div className="item__description">{texts.platform.environment}: <span>{data.environment}</span></div>
                <div className="item__description">{texts.platform.port.label}: <span>{data.port}</span></div>
                {data.ts && <div className="item__description">{texts.ts}: <span>{data.ts.compiler}</span></div>}
            </div>
            <div>
                {data.default && <span className="badge">{texts.default}</span>}
                {data.ssr && <span className="badge">{texts.ssr}</span>}
            </div>
        </li>
    )
}
