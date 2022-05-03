export const DSSpinner = React.forwardRef(({className, fetching, type}, ref) => {
    const finalType = type ?? 'primary';
    let cls = fetching ? 'ds-element-spinner show' : 'beyond-element-spinner';
    const clsContainer = `ds-spinner__container${className ? ` ${className}` : ''}`;

    return (
        <div ref={ref} className={clsContainer}>
            <BeyondSpinner className={cls} active type={finalType}/>
        </div>
    );
});