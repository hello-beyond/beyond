function Processors() {

    const {model} = useModuleContext();
    const {bundle: {processors}} = model;
    const output = [];
    processors.forEach((processor) => output.push(<Processor processor={processor} key={processor.id}/>));

    return <>{output}</>;

}