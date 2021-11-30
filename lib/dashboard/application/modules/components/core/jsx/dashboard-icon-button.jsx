export const DashboardIconButton = React.forwardRef((props, ref) => {

    let properties = {};

    const icon = props.icon;
    if (DS_ICONS.hasOwnProperty(icon)) {
        properties.icon = DS_ICONS[icon].icon;
        if (DS_ICONS[icon].viewBox) {
            properties.viewBox = DS_ICONS[icon].viewBox
        }
    }
    else if (icon && !props.icon) {
        properties.icon = icon;
    }

    return <BeyondIconButton ref={ref} {...props} {...properties}/>;

});

export const DsIconButton = DashboardIconButton;

