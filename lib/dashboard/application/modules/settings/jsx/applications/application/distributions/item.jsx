const DistributionItem = ({data, texts}) => {
    return (
        <li className="item-distribution">
            <div>
                {<h2>{data.name}</h2>}
                <div className="item__description">{texts.platform}: <span>{data.platform}</span></div>
                <div className="item__description">{texts.environment}: <span>{data.environment}</span></div>
                <div className="item__description">{texts.port}: <span>{data.port}</span></div>
                {data.ts && <div className="item__description">{texts.ts}: <span>{data.ts.compiler}</span></div>}
            </div>
            <div>
                {data.default && <span className="badge">{texts.default}</span>}
                {data.ssr && <span  className="badge">{texts.ssr}</span>}
            </div>
        </li>
    )
}
