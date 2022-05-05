class ApplicationItemModel extends ItemNotificationModel {

    get message() {
        const message = this.data.message.replace(this.application.pathname, '');
        return message;
    }

    #application;
    get application() {
        return this.#application;
    }

    constructor(data, application) {
        super(data);
        this.#application = application;
    }

}
