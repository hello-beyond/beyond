export function Compilation() {

    const {
        selected, status,
        setFetching,
        setStatus,
        application,
        texts
    } = useCompilerContext();

    const container = React.useRef(null);
    useBinder([application.builder], () => {

        const list = container.current.querySelector('.compile__trace__all-list');
        const errorList = container.current.querySelector('.compile__trace__error-list');

        const setMessage = (entries, error) => {
            const size = entries.length;
            if (!size) return;
            const item = document.createElement('li');
            const message = entries[size - 1];

            message.error && (item.className = 'message__error');
            item.innerHTML = message.text;
            if (message.error) {
                const errorItem = item.cloneNode(true);
                errorList.closest('.card').classList.remove('hidden');
                errorList.appendChild(errorItem);
            }

            list.appendChild(item);
        };

        const {messages, error} = application.builder;
        messages && setMessage(messages);
        error && setMessage(error, true);
    });
    React.useEffect(() => {
        const dist = application.deployment.distributions.get(selected);
        const {name, platform, environment} = dist;

        application.builder.build({name, platform, environment})
            .then(() => {
                setFetching(false);
                setStatus('finished');
            }).catch(e => {
            console.error('error', e)
        });

    }, []);

    return (
        <div ref={container}>
            {
                status === 'finished' && <Finished/>
            }
            <div className="ds-container two-columns no-m">
                <article className="card card--log">
                    <h3>{texts.log.title}</h3>
                    <ul className="compile__trace__list compile__trace__all-list"/>
                </article>

                <article className="card card--error-log hidden">
                    <h3>{texts.log.errorLog}</h3>
                    <ul className="compile__trace__list compile__trace__error-list"/>
                </article>
            </div>
        </div>

    )
}
