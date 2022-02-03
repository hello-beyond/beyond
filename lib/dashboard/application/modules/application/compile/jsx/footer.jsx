export function Footer() {

    const {finished, application, setFinished, selected, setFetching} = useCompilerContext();
    const [messages, setMessages] = React.useState([]);
    const list = React.useRef(null);
    const compile = async event => {
        event.stopPropagation();
        const dist = application.deployment.distributions.get(selected);
        const {name, platform, environment} = dist;
        setFetching(true);
        window.b = application.builder;

        application.builder.bind('change', () => {
            const {messages} = application.builder;
            const size = messages.length;
            if (!size) return;
            const item = document.createElement('li');
            item.innerHTML = messages[size - 1].text;
            list.current.appendChild(item);
        });
        await application.builder.build({name, platform, environment});
        setFetching(false);
        setFinished(true);
    }

    return (
        <>
            {
                !finished && (
                    <div className="compile__action">
                        <BeyondButton className="btn primary" onClick={compile}>Compilar</BeyondButton>
                    </div>
                )
            }
            <ul className="compile__trace__list" ref={list}/>
        </>

    )
}
