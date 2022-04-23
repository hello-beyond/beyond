function Processors({am}) {
    const bundles = am.bundles;
    const processors = new Set();
    //todo: @julio
    //todo: set logic directly in the Module Item object
    bundles.forEach(bundle => bundle.processors.forEach(processor => processors.add(processor.name)));
    const items = [...processors].map(item => <span key={`processor-${item}`} className="badge-item">{item}</span>)
    return (<>{items}</>);
}
