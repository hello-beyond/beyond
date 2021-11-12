function Actions(model) {

    this.open = () => window.open(model.url, '_blank');

    this.compile = (layer, application) => beyond.navigate(`/library/compile/${application.name}`);

    this.storeDescription = async value => {
        model.description = value;
        try {
            await model.publish();
            return true;
        }
        catch (e) {
            console.error(e);
            return false;
        }

    }

}
