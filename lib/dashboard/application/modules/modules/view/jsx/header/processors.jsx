function ProcessorsTags() {
    const {model} = useModuleContext();
    const items = [...model.processors].map(item => <span key={`p-${item}`} className="badge-item">{item}</span>);
    return (<div className="badge-list">{items}</div>)
}
