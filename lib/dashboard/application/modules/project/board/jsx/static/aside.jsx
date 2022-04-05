function StaticAside() {
    const {originalSrc} = useStaticContext();

    return (
        <aside className="static__items">
            <ul>
                <li><BeyondImage src={encodeURI(originalSrc)}/></li>
                <StaticOverwrite/>
            </ul>
        </aside>
    )
}
