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

export function DSCards({children}) {
    return (
        <section className="ds-cards__container">
            {children}
        </section>
    )
}