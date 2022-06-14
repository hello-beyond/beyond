function ModuleItem({item, module}) {
    return (
        <div>
            <h5>{module?.name}</h5>
            {item.message.replaceAll('\\', '/').replace(module?.path, '')}
        </div>
    );
}
