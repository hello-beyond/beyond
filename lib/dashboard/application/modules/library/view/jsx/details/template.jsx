class Template extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <article className={'template-item'}>
                <p>name: </p>
                <p>processors: </p>
                <p>overwrites: </p>
            </article>
        );
    }
}