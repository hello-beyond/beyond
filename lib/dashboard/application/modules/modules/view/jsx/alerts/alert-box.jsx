function AlertBox({title, type, elements}) {
    if (!elements.length) return null;

    const output = elements.map(item => <li key={item}>{item}</li>);
    return (

        <BeyondAlert type={type}>
            <h4>{title}</h4>
            <ul className="alert-list">
                {output}
            </ul>
        </BeyondAlert>

    )
}