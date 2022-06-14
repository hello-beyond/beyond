export function Page() {

    (() => {
        DSBoards.add('application', {
            control: ApplicationBoard,
            label: 'app'
        });
        DSBoards.add('applicationConfig', {
            control: ApplicationConfig,
            label: 'appConfig'
        });
        DSBoards.add('module', {
            control: ModuleBoard,
            label: 'module',
        });
        DSBoards.add('static', {
            control: StaticBoard,
            label: 'static'
        });

        DSBoards.add('settings', {
            control: ConfigBoard,
            label: 'settings'
        });

        DSBoards.add('applications', {
            control: ApplicationsBoard,
            label: 'apps'
        });
        DSBoards.add('navigator', {
            control: NavigatorBoard,
            label: 'navigator'
        });
        DSBoards.add('compile', {
            control: CompileBoard,
            label: 'compile'
        });

    })();

    const specs = {};

    if (this.qs.has('application_id')) {
        specs.id = this.qs.get('application_id');
    }
    if (this.qs.has('animation')) {
        specs.animation = this.qs.get('animation');
    }

    const workspace = new Workspace(specs);

    ReactDOM.render(React.createElement(DSWorkspace, {
        workspace,
        board: this.vdir,
        ...specs
    }), this.container);
    this.container.classList.add('ds-home-page');

    this.show = () => {

        // controller.createApp = this.vdir === 'create_app';

    }
}
