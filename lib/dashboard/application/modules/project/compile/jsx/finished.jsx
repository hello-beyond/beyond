export function Finished() {
    const {setStatus, texts, application, selected} = useCompilerContext();
    const dist = application.deployment.distributions.get(selected);

    const errors = application.builder.messages.filter(message => message.error);
    const type = errors.length ? 'error' : 'success';
    const path = `${application.path}/.beyond/builds/${dist.name}`.replace(/\\/g, '/');

    return (
        <div className="pd-base">
            <BeyondAlert type={type}>
                <h3>{errors.length ? texts.finished.error : texts.finished.success}</h3>
                <strong>{texts.finished.directory}</strong>
                <span className="pathname">{path}</span>
            </BeyondAlert>
            <div className="flex-container flex-end pd-v-1">
                <BeyondButton className="btn primary" onClick={() => setStatus('start')}>
                    {texts.actions.new}
                </BeyondButton>
            </div>
        </div>
    );
}