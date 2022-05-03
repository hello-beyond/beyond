function XHRLoader() {

    let promise, uploaded, progress, error;
    Object.defineProperty(this, 'uploading', {get: () => !!promise});
    Object.defineProperty(this, 'uploaded', {get: () => !!uploaded});
    Object.defineProperty(this, 'progress', {get: () => progress});
    Object.defineProperty(this, 'error', {get: () => error});

    const events = new Events({bind: this});

    const onProgress = (event) => {
        let percent;
        if (event.lengthComputable) {
            percent = Math.round(event.loaded * 100 / event.total);
            percent = parseInt(percent);
            progress = percent;
        }

        events.trigger('change');
    }
    const onCompleted = (event) => {

        
        uploaded = true;
        promise.resolve();
        events.trigger('change');

        setTimeout(function () {
            ts = Date.now();
            promise = undefined;
            events.trigger('change');
        }, 100);

    }
    const onError = (event) => {
        console.error('Error uploading picture', event);
        error = true;
        promise.reject();
        events.trigger('change');
    }
    const onAbort = () => {
        promise.resolve(false);
        events.trigger('change');
    }

    this.upload = async (data, url) => {
        try {
            const specs = {
                method: 'post',
                body: data
            };
            return fetch(url, specs);
        }
        catch (e) {
            console.error('error', e);
        }

    };

    this.abort = () => xhr ? xhr.abort() : null;

}
