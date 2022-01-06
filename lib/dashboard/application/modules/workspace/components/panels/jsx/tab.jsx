export function PanelTab({panel, item, id}) {

    const cls = `ds__tab ${panel.activeItem === id ? ' item-active' : ''}`;
    const isUnique = panel.tabs.size === 1 && panel.parent.items.size === 1;
    const attrs = {className: cls};
    const {texts: {panels: {tab: texts}}, workspace: {contextMenu}} = useDSWorkspaceContext();
    const {addPanel} = useWorkspacePanelsContext();
    const [unpublished, setUnpublished] = React.useState(panel?.editor?.unpublished);
    const [showContextMenu, toggleContextMenu] = React.useState();
    const ref = React.useRef();

    let label = typeof item === 'string' ? item : item.label;

    if (item.type !== 'editor' && item.path !== 'module') label = texts.labels[item.label];
    const [name, setName] = React.useState(label);
    if (panel.activeItem !== id) attrs.onClick = () => changeTab(item);
    const changeTab = item => panel.changeTab(item);
    const openContextMenu = () => {
        if (!ref.current === contextMenu.target) return;
        if (showContextMenu) return;
        toggleContextMenu({x: contextMenu.event.clientX, y: contextMenu.event.clientY});
    };

    useBinder([contextMenu], openContextMenu, 'fired.tab');
    useBinder([contextMenu], () => toggleContextMenu(false), 'closed');
    useBinder([panel], () => setName(panel.tabs.get(id).label), `tab.change.${id}`);

    React.useEffect(() => {
        if (item.type !== 'editor') return;
        const onChange = () => {
            if (item.source?.id === panel.editor.currentSource?.id) {
                setUnpublished(panel?.editor?.unpublished);
            }
        };
        panel.editor.bind('model.changed', onChange);
        return () => panel.editor.unbind('model.changed', onChange);
    }, []);

    const onClose = event => {
        event.stopPropagation();

        panel.closeTab(item);
    };

    const IconTab = () => {
        const cls = unpublished ? 'tab__icon tab--unpublished' : 'tab__icon';
        const attrs = {className: cls};
        if (isUnique) return null;
        if (!isUnique) attrs.onClick = onClose;
        return <DSIconButton icon="close" title={texts.actions.close} {...attrs}/>
    }

    return (
        <div ref={ref} data-context="tab" {...attrs}>
            {name}
            <IconTab/>
            {
                showContextMenu &&
                <DSContextMenu unmount={toggleContextMenu} specs={showContextMenu}>
                    <ul>
                        <ItemMenu onClick={addPanel} icon="splitView" label={texts.actions.splitRight}/>
                        <ItemMenu onClick={onClose} icon="splitView" label={texts.actions.close}/>
                    </ul>
                </DSContextMenu>
            }
        </div>
    )
}
