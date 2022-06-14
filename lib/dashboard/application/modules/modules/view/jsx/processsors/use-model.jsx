function useModel(specs) {

    const [model, setModel] = React.useState(moduleManager.active);
    const [ready, setReady] = React.useState(module.texts.current?.ready);
    let {panel} = useDSWorkspaceContext();
    React.useEffect(() => {
        let model;
        (async () => {
            if ([undefined, null].includes(specs?.moduleId)) return;
            model = await moduleManager.load(specs.moduleId);
            setModel(model);
            window.module = model;
            model.bind('change', onChange);
            panel.setTabName(specs.moduleId, model.name);

        })();
        return () => {
            model?.unbind('change', onChange);
        }
    }, [specs.moduleId]);

    return [ready, model];
}
