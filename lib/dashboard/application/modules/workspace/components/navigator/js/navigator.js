class Navigator extends HTMLElement {

    constructor() {
        super();

        const shadow = this.attachShadow({mode: 'closed'});
        this.shadow = shadow;
        shadow.innerHTML = `<iframe height="500" width="500" src="http://localhost:8080"/>`;
    }
}

window.customElements.define('dashboard-navigator', Navigator);
