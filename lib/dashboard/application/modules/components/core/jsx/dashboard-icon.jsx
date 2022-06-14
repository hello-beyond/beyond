export function DashboardIcon(props) {

    let properties = {};
    const icon = props.icon || props.name;

    if (DS_ICONS.hasOwnProperty(icon)) {
        properties.icon = DS_ICONS[icon].icon;
        if (DS_ICONS[icon].viewBox) properties.viewBox = DS_ICONS[icon].viewBox
    }
    else if (icon && !props.icon) properties.icon = icon;
    return <BeyondIcon {...props} {...properties}/>;

}

export const DSIcon = DashboardIcon;

<DSIcon icon="error"/>
