export class ContextMenu extends ReactiveModel {

    _event;
    get event() {
        return this._event;
    }

    get currentTarget() {
        return this.event?.currentTarget;
    }

    get target() {
        return this.event?.target;
    }

    constructor() {
        super();
        this.init();
    }

    init() {

        window.oncontextmenu = event => {
            this._event = event;
            const target = event.target;
            const parentContext = target.closest('[data-context]');

            if (target.dataset.context || parentContext) {
                event.preventDefault();
                event.stopPropagation();
                event = target.dataset.context || parentContext.dataset.context;
                this.triggerEvent('closed');
                this.triggerEvent(`fired.${event}`);
                return;
            }
            if (target.classList.contains('ds-context-menu') || target.closest('.ds-context-menu')) {

                this.triggerEvent('closed');
            }

        };
    }
}
