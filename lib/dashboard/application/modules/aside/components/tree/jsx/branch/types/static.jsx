function DSStaticBranch({branch, level}) {
    const [state, setState] = React.useState(branch.getters);
    const {panels, controller: {application}} = useDSAsideContext();
    const styles = {};
    if (level > 0) styles.paddingLeft = `${level * TREE_TABS}px`;
    useBinder([branch], () => setState(branch.getters));
    const {label, deleted} = state;

    if (!label || deleted) return null;
    /**
     * Opens a file
     * @param event
     */
    const onClick = event => {
        event.preventDefault();
        event.stopPropagation();
        const type = event.currentTarget.dataset.type;

        if (branch.icon === 'image') {
            panels.active.add('static', {
                label: type ? `${branch.label} overwrite` : branch.label,
                type,
                image: branch.source
            });
            return;
        }
        const url = `${application.application.url}${branch.item.pathname}${type ? `?${type}` : ''}`;
        window.open(url, '_blank')
        // openFile(branch.item, branch.link, branch.extension);
    };

    const {item} = branch
    const icon = item.overwrite ? 'imageOverwrite' : branch.icon;

    return (
        <li className="item" tabIndex="-1">
            {item.overwrite &&
             <section className="item__container item__overwrite" style={styles}
                      data-type="overwrite"
                      onClick={onClick}>
                 <div className="item__label">
                     <DsIcon icon={`file.${icon}1`}/>
                     <span>{label} </span>
                 </div>
                 {/*<DSInlineActions item={branch}/>*/}
             </section>
            }
            <DSItemHeader item={branch} level={level} onClick={onClick}>
                <div className="item__label">
                    <DsIcon icon={`file.${branch.icon}`}/>
                    <span>{label}</span>
                </div>
            </DSItemHeader>
        </li>
    );
}
