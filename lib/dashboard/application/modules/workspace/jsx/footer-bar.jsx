function FooterBar() {
    const {workspace: {application}, texts} = useDSWorkspaceContext();

    return (
        <footer className="ds-footer-bar">
            <div>
                Beyond JS
                {/*{pathname}*/}
            </div>
            <div>
                {application ?
                 <>
                     <span className="footer__label">{texts.footer.project}</span>
                     <span className="primary-text">{application.application.name}</span>
                 </> :
                 <span color="footer__label empty-label">{texts.footer.projectEmpty}</span>
                }
            </div>
        </footer>
    )
}