export function EmptyList({item}) {
    const {texts} = useDSAsideContext();

    return (
        <article className="empty__list">
            <div className="empty-tree">{texts.list.empty}</div>
        </article>
    )
}
