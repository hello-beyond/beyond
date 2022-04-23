function Aside() {
    const {panel} = useDSAsideContext();
    if (!panel) return null;
    const objectPanels = {
        application: ProjectTree,
        module: ModuleTree,
        template: TemplateRootTree,
        statics: StaticsRootTree,
        favorites: AsideFavorites,
    }
    const Control = objectPanels[panel];

    // const tree = (panel === 'application') ? modules : moduleManager.active?.bundles;
    const clsDetail = `ds__aside__detail`;

    return (
        <aside>
            <BeyondScrollContainer className={clsDetail}>
                {/*The spinner is used to show processing active when a module is loading*/}
                <>
                    <BeyondSpinner active={true}/>
                    <Control/>
                </>
            </BeyondScrollContainer>
        </aside>
    )
}
