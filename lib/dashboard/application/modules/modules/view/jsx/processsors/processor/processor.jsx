function Processor({processor}) {

    const [open, setOpen] = React.useState(true);
    const toggleContent = event => setOpen(!open);
    const cls = `processor_block-data two-columns ${!open ? ' hide-block' : ''}`;

    return (
        <article className="bundle_processor-container" key={processor.id}>
            <ProcessorHeader toggleContent={toggleContent} processor={processor}/>
            <ProcessorAlerts processor={processor}/>
            <div className={cls}>
                <List list={processor.files} title="Files" processor={processor.name}/>
                <List list={processor.overwrites} title="overwrites" processor={processor.name}/>
            </div>
        </article>
    );
}