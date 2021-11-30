const GeneralDiagnostics = ({data}) => {
    if (!data.length) return null;

    const output = data.map((item, i) => <li key={item.id}>{item.message}</li>);
    return (
        <BeyondAlert type="danger">
            <h5>Errores generales</h5>
            <ul>
                {output}
            </ul>
        </BeyondAlert>
    );
}
