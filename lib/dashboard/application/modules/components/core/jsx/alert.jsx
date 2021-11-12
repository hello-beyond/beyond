export function BeyondAlert(props) {

    const types = Object.freeze({
        success: 'alert-success',
        warning: 'alert-warning',
        error: 'alert-error',
        danger: 'alert-danger',
        info: 'alert-info'
    })

    const [closed, setClosed] = React.useState();

    let {type, title, message, className, icon, align, close, onClose} = props;

    const onClickClose = event => {
        const target = event.currentTarget;
        const parent = target.closest('.beyond-alert');
        parent.classList.add('hiding-component');
        window.setTimeout(() => {
            if (onClose) onClose();
            setClosed(true);
        }, 400);

    }
    if (!type) type = 'info';
    let cls = className ? `beyond-alert ${className}` : 'beyond-alert';
    cls += types.hasOwnProperty(type) ? ` ${types[type]}` : '';

    if (icon) cls += ' alert-icon';
    if (align) cls += ` alert-icon-${align}`;

    const output = [];

    if (title) output.push(<h3 key="title">{title}</h3>);
    if (message) output.push(<div key="message">{message}</div>);

    if (closed) return null;

    return (
        <div className={cls}>
            {(icon && !align) && <DashboardIcon className="alert-icon" name={icon}/>}
            <div className="beyond-alert_content">
                {output}
                {props.children}
            </div>
            {icon && align === 'right' && <DashboardIcon className="alert-icon" name={icon}/>}
            {
                close &&
                <DsIconButton onClick={onClickClose} className="beyond-alert__close-icon xs" icon="close"/>
            }
        </div>
    )

}
