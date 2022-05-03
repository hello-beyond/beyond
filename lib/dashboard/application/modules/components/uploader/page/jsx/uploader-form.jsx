function UploaderForm() {

    const {controller} = useJGalleryContext();
    const [error, setError] = React.useState();
    const [images, setImages] = React.useState([]);
    React.useEffect(() => {
        controller.create(btn.current, box.current);
    }, []);

    const btn = React.useRef(null);
    const box = React.useRef(null)

    return (
        <div className="jd-gallery__drop-zone" ref={box}>
            <BeyondIcon icon="upload"/>
            <h3>
                <a ref={btn}>Selecciona una image </a> o arrastrala.
            </h3>
            {
                error &&
                <div className="alert alert-danger">
                    El archivo subido no es válido, por favor verifiquelo y vuelva a
                    intentarlo
                </div>
            }
            <hr/>
        </div>
    )
}