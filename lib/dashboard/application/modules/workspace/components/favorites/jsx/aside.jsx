export function AsideFavorites() {

    const {workspace: {application: {favorites}}} = useDSWorkspaceContext();
    const [totalFavorites, setTotalFavorites] = React.useState(favorites?.items.size);
    const [renamed, setRenamed] = React.useState(favorites?.items.size);
    const {texts} = useDSAsideContext();

    useBinder([favorites], () => setTotalFavorites(favorites.items.size))
    useBinder([favorites], () => setRenamed(performance.now()), 'favorite.renamed');

    if (!favorites.items.size) {
        return (
            <div className="ds__aside__detail">
                <div className="alert alert-info">
                    <h3>{texts.favorites.empty.title}</h3>
                    <span>{texts.favorites.empty.description}</span>
                </div>
            </div>
        );
    }

    const items = [...favorites.items.values()]
    const output = items.map((item, key) => <DSTree key={key} object={item} title={item.name} tree={item.tree}/>);
    return (
        <>
            <header className="ds-aside__header">
                <h3>{texts?.favorites?.title}</h3>
            </header>
            <div>
                {output}
            </div>
        </>
    );
}
