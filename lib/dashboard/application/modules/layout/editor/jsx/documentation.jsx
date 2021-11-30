function Documentation({onClose, doc}) {

    const DOCS = {
        app: AppDoc
    };

    if (!DOCS.hasOwnProperty(doc)) return null;
    const Control = DOCS[doc];
    return (
        <BeyondModal className="ds-modal ds-modal-doc md pd" show onClose={onClose}>
            <Control/>
        </BeyondModal>
    );
}