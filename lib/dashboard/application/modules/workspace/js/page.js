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
            label: 'Compile App'
        });

    })();

    const specs = {};
    let board = 'applications';
    if (this.qs.has('application_id')) {
        specs.id = this.qs.get('application_id');
        board = 'application';
    }

    const workspace = new Workspace(board, specs);

    ReactDOM.render(React.createElement(DSWorkspace, {
        workspace,
        board: this.vdir
    }), this.container);
    this.container.classList.add('ds-home-page');

    this.show = () => {

        // controller.createApp = this.vdir === 'create_app';

    }
}
