function AdditionalFields({children}) {
    const [additional, setAdditional] = React.useState(false);
    const {texts} = useCreateModuleContext();
    const onAdditional = () => setAdditional(!additional);
    const cls = additional ? 'show' : '';

    return (
        <>
            <h5 className="link title-separator" onClick={onAdditional}>
                {texts.additionalFeatures}
            </h5>
            <div className={`additional-config ${cls}`}>
                {children}
            </div>
        </>
    )
}
