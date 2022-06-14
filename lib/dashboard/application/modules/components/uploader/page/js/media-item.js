export class MediaItem extends Item {
    _id;
    _name;
    _directory;
    _type;
    _intern;
    _description;
    _legend;
    _alt;
    _metaData;
    _languageId;
    _originalText;
    _originalName;
    _cover;

    _routes = {
        load: '/gallery/load',
        publish: '/media/publish',
        delete: '/media/delete'
    }

    _skeleton = ['id', 'name', 'directory', 'type', 'intern', 'description',
        'legend', 'alt', 'metaData', 'languageId', 'originalText', 'originalName', 'cover'];

    _gettersIgnored = ['metaData'];

    get src() {
        return this.metaData.urls;
    }

    get min() {
        return this.getUrl('150x150');
    }

    get middle() {
        return this.getUrl('400x400');
    }

    get big() {
        return this.getUrl('800x800');
    }

    get bigger() {
        return this.getUrl('1200x1200');
    }

    get original() {
        return this.getUrl('original');
    }

    constructor(props) {
        super();
        this.instance(props);
    }

    get metaData() {
        try {
            if (!this._metaData) return {};
            return JSON.parse(this._metaData);
        }
        catch (e) {
            console.error('exception', e, this._metaData)
            return {};
        }

    }

    getUrl(source) {
        return this.metaData?.urls?.[source] ? this.metaData.urls[source] : undefined;
    }

    loadFromLocal(data) {
        this.setProperties(data);
        this._loaded = true;
    }
}
