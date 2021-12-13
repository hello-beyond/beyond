function ArrowTree({opened}) {
    const clsIcon = `tree__icon-open ${opened ? ` tree__icon--opened` : ''}`;
    return <DSIcon className={clsIcon} icon="arrowDropDown"/>;
}
