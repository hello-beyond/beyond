function ArrowTree({opened}) {
    const clsIcon = `tree__icon-open ${opened ? ` tree__icon--opened` : ''}`;
    return <DsIcon className={clsIcon} icon="arrowDropDown"/>;
}
