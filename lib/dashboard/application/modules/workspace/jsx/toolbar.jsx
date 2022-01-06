function Toolbar() {


    const cls = "primary";
    // if (controller.processing) specs.disabled = true;

    const items = [
        ['Home', '/'],
        // ['App', `/application/${application.id}`],
        // /    [module.name, '']
    ];
    return (

        <section className={`ds-toolbar ${cls}`}>
            <div className="toolbar__aside__logo"/>
            <div className="group-items-toolbar">
                <DsBreadcrumb items={items}/>
                <NotificationPanel/>
            </div>

        </section>
    )
}
