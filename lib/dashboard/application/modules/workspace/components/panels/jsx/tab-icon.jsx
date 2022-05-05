export function TabIcon({item}) {
    let icon = 'setting';
    if (item.type !== 'editor') {
        let name = item.name === 'applications' ? 'apps' : (item.name === 'application' ? 'project' : item.name);
        icon = DS_ICONS.hasOwnProperty(name) ? name : icon;
    }
    window.ds = DS_ICONS;
    if (item.type === 'editor') {
        icon = DS_ICONS.hasOwnProperty(`processor.${item.processor}`) ? `file.${item.processor}` : 'code';
    }

    return (
        <>
            <DSIcon icon={icon}/>
        </>
    )
}
