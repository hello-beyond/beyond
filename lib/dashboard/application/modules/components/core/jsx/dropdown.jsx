export function Dropdown({children, control}) {

    const [opened, setOpened] = React.useState(true);
    return (
        <>
            <section className="ds-dropdown__header">
                {children}
            </section>
            <section className="ds-dropdown__content">
                {control}
            </section>

        </>
    )
}