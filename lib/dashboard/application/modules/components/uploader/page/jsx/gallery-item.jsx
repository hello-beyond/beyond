function GalleryItem({item}) {

    const src = item.loaded ? item.min : item.src;
    const {controller} = useJGalleryContext();
    const onDelete = () => {
        if (!item.loaded) return;
        controller.deleteItem(item.get('name'));
    };

    return (
        <BeyondImage className="jd-gallery__img" src={src}>
            {
                item.loaded &&
                <figcaption>
                    <BeyondIconButton icon="delete" onClick={onDelete}/>
                    <BeyondIconButton icon="edit"/>
                </figcaption>
            }

        </BeyondImage>
    )
}