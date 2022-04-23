/**
 * Represents a preaside option element.
 *
 * @param name
 * @param setActive
 * @param tab
 * @param active
 * @returns {JSX.Element}
 * @constructor
 */

function PreAsideTab({name, tab}) {
    const {activePreAside: active} = useDSAsideContext();
    const cls = name === active ? 'active' : '';
    const onClick = event => {
        event.stopPropagation();
        tab.action(name);
    };
    const datas = {};
    if (tab.tippy) datas.tippy = tab.tippy;

    return (
        <li className={cls}>
            <DSIconButton title={tab.title} icon={tab.icon} {...datas} onClick={onClick}/>
        </li>
    )
}
