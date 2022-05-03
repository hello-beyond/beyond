export const camera = new (function () {

    const camera = navigator.camera;
    if (!camera) return;

    const PictureSourceType = camera.PictureSourceType;

    this.getPicture = (source, specs) => new Promise((resolve, reject) => {

        specs = specs ? specs : {};

        const targetWidth = specs.targetWidth ? specs.targetWidth : 800;
        const targetHeight = specs.targetHeight ? specs.targetHeight : 800;
        const quality = specs.quality ? specs.quality : 50;
        const encoding = specs.encoding ? specs.encoding : 'JPEG';

        function onCamera(uri) {

            if (uri) resolve(uri);
            else reject(new ResourceSelectorError(ERROR.FILE_SELECTION_CANCELED, 'File selection canceled'));

        }

        function onError() {
            reject(new ResourceSelectorError(ERROR.FILE_SELECTION_CANCELED, 'File selection canceled'));
        }

        source = source.toUpperCase();
        source = source === 'CAMERA' ? 'CAMERA' : 'PHOTOLIBRARY';
        source = PictureSourceType[source];

        camera.getPicture(onCamera, onError, {
            quality: quality,
            allowEdit: true,
            sourceType: source,
            correctOrientation: true,
            targetWidth: targetWidth,
            targetHeight: targetHeight,
            encodingType: camera.EncodingType[encoding],
            destinationType: camera.DestinationType.FILE_URI
        });

    });

});
