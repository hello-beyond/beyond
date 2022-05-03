function ModuleNotifications({module}) {

    const output = [];

    const specs = {module};
    module.errors.forEach(item => output.push(<FactoryItem item={item} key={item.id} {...specs}/>));
    module.warnings.forEach(item => output.push(<FactoryItem item={item} key={item.id}/>));
    if (module.general) {
        module.general.forEach(general => {
            general.forEach(item => {
                output.push(<FactoryItem {...specs} item={item} key={`general-${item.id}`}/>);
            });
        })
    }
    if (module.dependencies) {
        module.dependencies.forEach(item => output.push(<FactoryItem {...specs} item={item}
                                                                     key={`dependencies-${item.id}`}/>));
    }

    if (module.overwrites) {
        module.overwrites.forEach(overwrites => {
            overwrites.forEach(item => {
                output.push(<FactoryItem {...specs} item={item} key={`module-${item.id}`}/>);
            });
        });
    }

    if (module.files) {
        module.files.forEach(files => {
            files.forEach(item => output.push(<FactoryItem {...specs} item={item} key={`file-${item.id}`}/>));
        });
    }
    return (<>{output}</>)
}
