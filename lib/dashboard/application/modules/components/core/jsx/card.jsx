export function DSCard({header, children}) {
    return (
        <article className="ds-cards__card">
            {
                header &&
                <header>
                    {header}
                </header>
            }
            <section>
                {children}
            </section>
        </article>
    )
}

export function DSCards({children, className}) {
    const cls = `ds-cards__container${className ? ` ${className}` : ''} `;
    return (
        <section className={cls}>
            {children}
        </section>
    );
}
