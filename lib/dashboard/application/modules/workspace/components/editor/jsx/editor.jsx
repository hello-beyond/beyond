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
        this.listenChanges = this.listenChanges.bind(this);
        this.updateState = () => this.setState({});
        this.disposables = [];
        this.setActive = this.setActive.bind(this);
    }

    setActive() {
        this.panel.setActive();
    }

    listenChanges() {
        this.setState({isUnpublished: true});
    }

    componentDidMount() {
        const data = this.state.file ? {file: this.state.file, processor: this.state.processor} : {};
        this.editor.init(this.vs.current);
        this.vs.current.addEventListener('click', this.setActive)
        this.editor.bind('change', this.updateState);
    }

    componentWillUnmount() {
        this.vs.current.removeEventListener('click', this.setActive)
        this.editor.unbind('change', this.updateState);
        this.editor.removeListeners();
        // this.editor && this.editor.instance.dispose();
        // this.panel.editor.delete(this.id, this.editor);
    }

    render() {

        const cls = `ds-editor__container ${this.state.unpublished ? ' is-unpublished' : ''} `;

        return (
            <div className={cls}>
                {
                    this.state.isUnpublished ?
                        <>
                            <div className="ds-editor__icons">
                                <DsIcon icon="save"/>
                            </div>
                        </>
                        : null
                }
                <div className="vs-editor" ref={this.vs}/>
            </div>
        );
    }
}

EditorView.contextType = DSWorkspaceContext;
