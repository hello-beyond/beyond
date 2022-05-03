export function useController() {
    const [controller, setController] = React.useState(null);

    React.useEffect(() => {
        const controller = new Controller(...arguments);
        const onChange = () => {
        };
        controller.bind('change', onChange)
        return () => controller.unbind('change', onChange);
    }, []);

    return [controller];
}