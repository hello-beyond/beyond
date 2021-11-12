function GalleryItem({item}) {
    const {workspace: {uploader, application: {application}}} = useDSWorkspaceContext();

    const src = item.fetched ? `${application.url}${item.pathname}` : item.src;
    const onDelete = () => uploader.deleteItem(item.filename);

    return (
        <BeyondImage className="jd-gallery__img" src={src}>
            {item.fetched &&
             <figcaption>
                 <BeyondIconButton icon="delete" onClick={onDelete}/>
             </figcaption>
            }
        </BeyondImage>
    )
}
