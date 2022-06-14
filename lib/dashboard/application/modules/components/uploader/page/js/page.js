export function Page() {
    const controller = new UIController();

    this.show = () => {
        ReactDOM.render(React.createElement(View, {controller: controller}), this.container);
        this.container.id = 'app-gallery-page';
        this.container.classList.add('jadmin-page', 'jd-page__gallery');
    };

    this.hide = () => setTimeout(() => ReactDOM.unmountComponentAtNode(this.container), 350);
}
