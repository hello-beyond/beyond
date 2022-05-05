function LibraryErrors({library, texts}) {

    const {errors, warnings} = library;
    const output = [];

    if (errors.length) {
        const errorsOutput = [];
        errors.map((error, index) => {
            errorsOutput.push(<div key={`error-${index}`}>{error}</div>);
        });
        output.push(
            <BeyondAlert title={texts.titles.errors} key="errors" className="error">{errorsOutput}</BeyondAlert>
        );
    }

    if (warnings.length) {
        const warningsOutput = [];
        warnings.map((error, index) => {
            warningsOutput.push(<div key={`error-${index}`}>{error}</div>);
        });
        output.push(<BeyondAlert key="warnings" className="error">{warningsOutput}</BeyondAlert>);
    }

    return (
        <header className="item message">
            {output}
        </header>
    )

}
