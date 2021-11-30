function AdditionalFields({children}) {
    const [additional, setAdditional] = React.useState(false);
    const onAdditional = () => setAdditional(!additional);
    const cls = additional ? 'show' : '';

    return (
        <>
            <h5 className="link title-separator" onClick={onAdditional}>
                Configuración Adicional
            </h5>
            <div className={`additional-config ${cls}`}>
                {children}
            </div>
        </>
    )
}