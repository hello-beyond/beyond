/**
 * Funcionamiento para integrar objeto con plugin de carga de fotos en phonegap.
 * @TODO: revisar, cerrar, probar.
 * @param parent
 * @constructor
 */
function MobileUploader(parent) {

    const onClick = async (event) => {
        let picture = await camera.getPicture('camera');
        const data = {
            url: picture,
            name: picture
        };
        try {

            const specs = {
                maxWidth: 2048,
                maxHeight: 2048
            };

            const resize = await resizePicture(data.url, specs);
            data.url = resize.src;
            data.width = resize.width;
            data.heigth = resize.height;
            data.type = 'image/jpg';
            await mobileFiles.getFiles(data);

        }
        catch (e) {
            console.error('Error process image: ', e);
        }
    }
    parent.mobile = async (btn) => {
        if (!(btn && navigator.camera)) return;
        btn.addEventListener('click', onClick);

    };
}