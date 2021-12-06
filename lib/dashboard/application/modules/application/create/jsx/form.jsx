function Form() {

    const {type, setType, model, texts: {form: texts}} = useCreateAppContext();

    const onSubmit = event => {
        event.preventDefault();
        model.create();
    };

    const typeIcon = type === 'empty' ? 'appTemplate' : 'newApp';

    return (
        <div className="ds-modal_content form-content">
            <BeyondForm onSubmit={onSubmit}>
                {type ?
                    <>
                        <div className="block-types__selected" onClick={() => setType(undefined)}>
                            <DsIcon icon={typeIcon}/>
                            <div>
                                <h4>{texts.types[type].title}</h4>
                                <p>{texts.types[type].description}</p>
                            </div>
                        </div>
                        <DetailApp type={type}/>
                    </>
                    :
                    <Blocks/>
                }
            </BeyondForm>
        </div>
    );
}