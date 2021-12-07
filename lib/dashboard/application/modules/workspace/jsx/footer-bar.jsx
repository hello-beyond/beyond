function FooterBar() {
    const {workspace, workspace: {application}, texts} = useDSWorkspaceContext();
    const [fetching, setFetching] = React.useState();

    const clean = event => {
        event.preventDefault();
        workspace.dashboard.cleanCache();
    }
    return (
        <footer className="ds-footer-bar">
            <div>
                Beyond JS
                {/*{pathname}*/}
            </div>
            <div className="flex-container">
                <BeyondButton onClick={clean}>{
                    fetching ? <BeyondSpinner active className="on-primary"/> : `Clean cache`
                } </BeyondButton>
                {application ?
                    <>
                        <span className="footer__label">{texts.footer.project}</span>
                        <span className="primary-text">{application.application.name}</span>
                    </> :
                    <>
                        <span color="footer__label empty-label">{texts.footer.projectEmpty}</span>
                    </>

                }
            </div>
        </footer>
    )
}
