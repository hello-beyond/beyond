const ItemListDistreibutions = ({ data, texts }) => {
    return (
        <li className="item-distribution">
            <div className="right-box-distributions">
                {data.name && <h4>{texts.name}: <span>{data.name}</span></h4>}
                <h4>{texts.platform}: <span>{data.platform}</span></h4>
                <h4>{texts.environment}: <span>{data.environment}</span></h4>
                <h4>{texts.port}: <span>{data.port}</span></h4>
                {data.ts && <h4>{texts.ts}: <span>{data.ts.compiler}</span></h4>}
            </div>
            <div className="left-box-distributions">
                {data.default && <span>{texts.default}</span>}
                {data.ssr && <span>{texts.ssr}</span>}
            </div>
        </li>
    )
}