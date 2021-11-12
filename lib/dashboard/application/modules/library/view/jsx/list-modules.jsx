export class ListModules extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {texts, library} = this.props;

        return (
            <>
                <LibraryErrors library={library} texts={texts}/>
                <ModulesList collection={library} filter="library" texts={texts}/>
            </>
        )
    }
}
