export function DsHeaderBar({children, className}) {

    const cls = `ds-header-bar${className ? ` ${className}` : ''}`;

    return (

        <header className={cls}>
            <div className="ds-container">
                {children}
            </div>
        </header>

    )
}