class DragAndDropUploader {

    constructor(parent, files, specs) {

        this.parent = parent;
        this.files = files;
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(event) {
        event.preventDefault();
        const {dataTransfer} = event;
        if (!dataTransfer.items.length) {
            console.log('no hay elementos');
            return;
        }
        const files = [];
        for (let i = 0; i < dataTransfer.items.length; ++i) {
            files.push(dataTransfer.items[i].getAsFile());
        }

        this.files.getFiles(files);
        console.log('ejecutando ondrop')
    }

    onDragOver(event) {
        event.preventDefault();
        console.log('ejecutando dragOver');
    }

    /**
     * Add the drag & drop events to the control
     * @param {HTMLInputElement} selector
     */
    add(selector) {
        selector.ondrop = this.onDrop;
        selector.ondragover = this.onDragOver;
    }
}