export class Item extends ReactiveModel {
    async load() {
        try {
            this._fetching = true;
            this.triggerEvent();

            const response = await this.Api.get(this._routes.load, {id: this._id});

            if (response.status) this.setProperties(response.data);
            else this._errors = response.error;

            this._loaded = true;
            this._fetching = false;
            this.triggerEvent();

            return response;

        }
        catch (exc) {
            console.error('Error: ', exc)
            return {status: false, error: exc}
        }
    }

    async publish() {

        this._fetching = true;
        this.triggerEvent();

        try {
            const params = this.getProperties();
            const response = await this.Api.post(this._routes.publish, params);

            if (response.status) this.setProperties(response.data);
            else this._errors = response.error;

            this._fetching = false;
            this.triggerEvent();

            return response;

        }
        catch (exc) {
            this._fetching = false;
            this.triggerEvent();
            console.error('Error: ', exc);
            return {status: false, error: exc}
        }
    }

    async remove() {
        try {
            const response = await this.Api.post(this._routes.delete, {id: this.get('id')});
            if (!response?.status) this._errors = response.error;
            return response;
        }
        catch (exc) {
            console.error('Error: ', exc);
            return {status: false, error: exc}
        }
    }
}