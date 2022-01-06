export function JidaUploader(specs) {
    const events = new Events({bind: this});
    Object.defineProperty(this, 'events', {get: () => events});

    let control;
    const fileInput = document.createElement('input');
    const openDialog = () => fileInput.click();
    const filesLoaded = () => events.trigger('loadend');
    const pictureLoaded = () => events.trigger('pictureLoaded');
    const pictureLoading = () => events.trigger('pictureLoading');

    const getErrors = () => this.errors = files._errors;

    /**
     * Adds de click and change events into the input file
     */
    const addListener = () => {
        if (!control) return;
        control.addEventListener('click', openDialog);
        fileInput.addEventListener('change', files.onChangeInput);
    };

    new MobileUploader(this);
    /**
     * Manager of the files
     * @type {UploadFiles}
     */
    const files = new UploadFiles(this, specs);
    Object.defineProperty(this, 'files', {get: () => files});
    files.bind('error', getErrors);
    files.bind('loadend', filesLoaded);

    const ddController = new DragAndDropUploader(this, files, specs);

    this.addDragAndDrop = selector => {
        ddController.add(selector)
    };
    this.create = btn => {
        btn.after(fileInput);
        control = btn;
        addListener();
    };

    this.clean = async () => {
        await files.clean();
        await mobileFiles.clean();
    };

    const setAttributes = specs => {
        if (!specs) specs = {};

        let attrs = Object.assign({
            type: 'file',
            style: 'display:none',
            name: 'input_upload'
        }, specs);

        for (let prop in attrs) fileInput.setAttribute(prop, attrs[prop]);
    };

    setAttributes(specs && specs.input);

    const mobileFiles = new MobileFiles(specs);
    Object.defineProperty(this, 'mobileFiles', {get: () => mobileFiles});
    //mobileFiles.bind('error', getErrors);
    mobileFiles.bind('loadend', pictureLoaded);
    mobileFiles.bind('loading', pictureLoading);

    this.publish = async (additionalParams = {}) => {
        const form = new FormData();
        //const collection = isCamera ? mobileFiles : files;
        const collection = files;
        const name = collection.total > 1 ? `${specs.name}` : specs.name;
        collection.entries.forEach(item => form.append(name, item));

        const xhr = new XHRLoader();
        const params = Object.assign(specs.params ? specs.params : {}, additionalParams);

        for (let param in params) {
            if (!params.hasOwnProperty(param)) continue;
            form.append(param, specs.params[param]);
        }

        const response = await xhr.upload(form, specs.url);
        return response.json();
    }
}