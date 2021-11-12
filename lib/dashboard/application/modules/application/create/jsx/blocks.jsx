function Blocks({selectType, texts}) {

    return (
        <div className="applications__types">
            <h4 className="">{texts.types.empty.title}</h4>
            <ul className="items__list">
                <li onClick={selectType} data-type="empty" className="list__item">
                    <BeyondImage src="/images/logos/typescript.png"/>
                    <div className="content">
                        <h4>{texts.types.typescript.title}</h4>
                        <p>{texts.types.typescript.description}</p>
                    </div>


                </li>
                <li onClick={selectType} data-type="react" className="list__item">
                    <BeyondImage src="/images/logos/react.png"/>
                    <div className="content">
                        <h4>{texts.types.react.title}</h4>
                        <p>{texts.types.react.description}</p>
                    </div>
                </li>
                <li onClick={selectType} data-type="node" className="list__item disabled">
                    <BeyondImage src="/images/logos/node.png"/>
                    <div className="content">
                        <h4>{texts.types.node.title}</h4>
                        <p>{texts.types.node.description}</p>
                    </div>
                </li>
            </ul>
            <h4 className="block_types-title">{texts.types.basic.title}</h4>
            <ul>
                <li onClick={selectType} data-type="basic" className="list__item">
                    <DsIcon icon="newApp"/>
                    <div className="content">
                        <h4>{texts.types.list.title}</h4>
                        <p>{texts.types.list.description}</p>
                    </div>

                </li>
            </ul>

        </div>
    );
}
