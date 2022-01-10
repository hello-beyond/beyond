export function SmallCard({icon, header, content, children}) {
    return (
        <div className="ds-small-card card">

            {
                icon &&
                <section className="ds-small-card__icon">
                    <DSIcon className="circle primary" icon={icon}/>
                </section>
            }
            <section className="content">
                {header && <h5 className="ds-small-card__header">{header}</h5>}
                {content && <span className="ds-small-card__detail">{content}</span>}
            </section>

        </div>
    )
}
