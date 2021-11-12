export function Page() {

    (() => {
        DSBoards.add('application', {
            control: ApplicationBoard,
            label: 'Aplicación'
        });
        DSBoards.add('applicationConfig', {
            control: ApplicationConfig,
            label: 'Aplicación'
        });
        DSBoards.add('module', {
            control: ModuleBoard,
            label: 'Module',
        });
        DSBoards.add('static', {
            control: StaticBoard,
            label: 'Static'
        });

        DSBoards.add('settings', {
            control: ConfigBoard,
            label: 'Configuración'
        });

        DSBoards.add('applications', {
            control: ApplicationsBoard,
            label: 'Aplicaciones'
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
