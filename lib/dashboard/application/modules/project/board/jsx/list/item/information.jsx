function ModuleInformation({am}) {

    if (!am) return null;
    const {application, navigateModule} = useAppContext();
    const link = am.route ? `${application.application.url}${am.route.toLowerCase()}` : '';
    let {path, name} = am.module;

    path = path.toLowerCase().replace(application.application.path.toLowerCase(), '');
    const navigate = event => {
        event.preventDefault();
        navigateModule({
            url: link,
            route: am.route
        });
    }
    const route = `${am.route?.toLowerCase()}`;
    return (
        <div className="col flex-center-y">
            <h5 className="lower">{path}</h5>
            {(name) &&
             <h6 className="module__name primary-color">
                 {name}
             </h6>
            }
            {am.route &&
             <span
                 target="_blank" className="link acent"
                 onClick={navigate}>
                 {route}
             </span>
            }
        </div>
    );
}
