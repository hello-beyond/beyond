function FactoryItem({item, module}) {

    const TYPES = {
        application: ApplicationItem,
        module: ModuleItem,
        bundle: BundleItem,
        source: SourceItem,
        default: DefaultItem,
        diagnostics: DiagnosticItem
    };
    const Control = TYPES.hasOwnProperty(item.type) ? TYPES[item.type] : TYPES.default;
    return (
        <div className="ds-notification__list-item">
            <Control item={item} module={module}/>
        </div>
    );

}
