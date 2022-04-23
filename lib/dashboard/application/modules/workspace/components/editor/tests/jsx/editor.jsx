export class EditorView extends React.Component {
    /**
     * @param {object} props.editor Editor Model object
     * @param {object} props.panel The module controller
     * @params {string} props.processor The processor type of the file
     * @params {string} props.file The filename
     * @params {string} props.id Identifier of the module
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {ready: false};
        this.vs = React.createRef();
        this.editor = props.editor;
        this.id = props.editor.id;
        this.panel = props.panel;
        this.updateState = () => this.setState({});

        this.setActive = this.setActive.bind(this);
    }

    setActive() {
        this.panel.setActive();
    }

    componentDidMount() {
        const data = this.state.file ? {file: this.state.file, processor: this.state.processor} : {};

        //  Validamos si hay una configuracion guardada por el usuario
        let config = localStorage.getItem('__DashboardEditorConfig');
        config = config ? JSON.parse(config) : undefined;
        this.editor.init(this.vs.current, config);
        this.vs.current.addEventListener('click', this.setActive)
        this.editor.bind('change', this.updateState);
    }

    componentWillUnmount() {
        this.vs.current.removeEventListener('click', this.setActive)
        this.editor.unbind('change', this.updateState);
        // this.editor && this.editor.instance.dispose();
        // this.panel.editor.delete(this.id, this.editor);
    }

    render() {

        return (
            <div className="ds-editor__container">
                <div className="vs-editor" ref={this.vs}/>
            </div>

        );
    }
}

EditorView.contextType = AppModulesContext;