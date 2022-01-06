function ModuleInformation({module}) {

    if (!module) return null;
    const {application, navigateModule} = useAppContext();
    const link = module.route ? `${application.application.url}${module.route.toLowerCase()}` : '';

    const navigate = event => {
        event.preventDefault();
        navigateModule({
            url: link,
            route: module.route
        });
    }
    return (
        <div className="col flex-center-y">
            <h5 className="lower">{module.pathname}</h5>
            {(module.developer && module.name) &&
             <h6 className="module__name primary-color">
                 {module.developer}/{module.name}
             </h6>
            }
            {module.route &&
             <a
                 target="_blank" className="link"
                 onClick={navigate}
                 href={`${application.url}${module.route.toLowerCase()}`}>
                 {application.url}{module.route.toLowerCase()}
             </a>
            }
        </div>
    );
}