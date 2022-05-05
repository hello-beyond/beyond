function StaticHeader() {
    const {image} = useStaticContext();

    return (
        <div className="static__header">
            <header className="text-left">
                <h3>{image.filename}</h3>
                <h6 className="text-muted">{image.file}</h6>
            </header>

        </div>
    );
}
