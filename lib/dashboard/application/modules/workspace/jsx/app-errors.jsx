function AppErrors() {

    const {module, application} = useDSWorkspaceContext();

    const errors = application?.errors.map((error, i) => <li key={`error-${i}`}>{error}</li>);
    const warnings = application?.warnings.map((warnings, i) => <li key={`warnings-${i}`}>{warnings}</li>);
    return (
        <div className="ds__workspace__errors">
            {
                !!errors?.length &&
                <BeyondAlert type="error">
                    <ul>{errors}</ul>
                </BeyondAlert>
            }
            {
                !!warnings?.length &&
                <BeyondAlert type="warning">
                    <ul>{warnings}</ul>
                </BeyondAlert>
            }
        </div>
    );
}
