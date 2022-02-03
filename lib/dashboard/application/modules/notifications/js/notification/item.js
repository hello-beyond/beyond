class ItemNotificationModel extends ReactiveModel {

    _id;
    get id() {
        return this._id;
    }

    get data() {
        return this._data;
    }

    get type() {
        return "application";
    }

    constructor(data) {
        super();
        this._data = data;
        this._id = data.id;
    }
}
