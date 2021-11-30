function List({list, title, processor}) {

    const {closeModal, application, model: {bundle, moduleId}} = useModuleContext();

    const output = list?.items.map((file, i) => {

            let specs = {
                applicationId: application.id,
                moduleId: moduleId,
                bundle: bundle.name,
                file: file.filename,
                processor: processor
            };
            const qs = new URLSearchParams(specs).toString();
            const navigate = event => {
                event.preventDefault();
                beyond.pushState(`/editor?${qs}`);
                //the boolean is used to avoid beyond.back fires by default
                // in the closeModal method.
                closeModal(false);
            }
            return (<li key={`${file.filename}-${i}`}><a href="#" onClick={navigate}>{file.filename}</a></li>);
        }
    );
    return (
        <div>
            <h4 className="p2 primary-color bundle-processor_title">
                {title}
            </h4>
            {list?.items?.length ?
                <ul>{output}</ul>
                :
                <div>No hay archivos</div>
            }
        </div>
    );
}