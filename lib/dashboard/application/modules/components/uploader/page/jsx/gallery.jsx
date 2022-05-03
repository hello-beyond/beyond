function GalleryView() {
    const {controller: {items}} = useJGalleryContext();

    if (!items) return null;

    const imagesOutput = [];
    items.forEach((item, i) => imagesOutput.push(<li key={`image-${i}`}><GalleryItem item={item}/></li>));

    return (
        <div className="jd-gallery__list">
            <ul>
                {imagesOutput}
            </ul>
        </div>
    );
}