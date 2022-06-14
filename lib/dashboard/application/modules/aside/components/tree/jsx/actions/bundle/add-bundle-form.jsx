const AddBundleContext = React.createContext();
const useAddBundleContext = () => React.useContext(AddBundleContext);

function AddBundleForm({closeModal, item: {object}}) {
    const {texts: {tree: {bundle: texts}}} = useDSAsideContext();
    const [fetching, setFetching] = React.useState(false);

    const specs = {
        state: {name: '', route: '', type: false, layoudId: ''},
        validations: {
            name: {
                validation: (value) => !!value.match(/[a-z]+-[a-z]+/g),
                message: texts.widget.inputs.name.error
            },
            layoudId: {
                validation: (value) => !!value.match(/[a-z]+-*/g),
                message: texts.widget.inputs.layoutId.error
            },
            route: {
                validation: value => !!value.match(/^\/[a-z_-]+(\/\$\{[a-z]+\})*/g),
                message: texts.widget.inputs.route.error
            }
        }
    }
    const [formValues, handleChange, reset, errors, setValue] = useForm(specs);
    const {bundle} = formValues;

    const Control = bundle === 'widget' ? WidgetForm : MainForm;

    return (
        <AddBundleContext.Provider value={{
            closeModal,
            fetching,
            setFetching,
            object,
            setValue,
            reset,
            errors,
            texts,
            handleChange,
            formValues
        }}>
            <Control/>
        </AddBundleContext.Provider>
    );
}
