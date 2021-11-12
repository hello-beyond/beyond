function FormFooter() {
    const {model, texts} = useCreateModuleContext();
    const [isValid, setIsValid] = React.useState(model.bundle?.valid);
    React.useEffect(() => {
        const onChange = () => setIsValid(model.bundle.valid);
        model.bundle?.bind('change', onChange);
        const unMount = () => {
            if (model.bundle) model.bundle?.unbind('change', onChange);
        }
        return unMount;
    });

    const attrs = {};
    if (!isValid) attrs.disabled = true;

    return (
        <footer className="align-right ds-modal__actions">
            {model.fetching ?
             <BeyondSpinner fetching/>
                            :
             <BeyondButton {...attrs} className="btn primary" type="submit">
                 {texts.form.button}
             </BeyondButton>
            }
        </footer>
    )
}
