

function GalleryView() {
    const {workspace: {uploader}} = useDSWorkspaceContext();
    const {items} = uploader;
    if (!items || !items.size) return null;

    const output = [];
    items.forEach((item, i) => output.push(<li key={`image-${i}`}><GalleryItem item={item}/></li>));

    return (
        <div className="jd-gallery__list">
            <ul>{output}</ul>
        </div>
    );
}
