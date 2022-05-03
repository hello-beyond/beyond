export const useForm = ({state, validations}) => {

    const [values, setValues] = React.useState(state);
    const [errors, setErrors] = React.useState({})
    const reset = () => setValues(state);
    const handleChange = ({target}) => {
        const {name, value} = target;
        if (validations.hasOwnProperty(name)) {
            const {validation, message} = validations[name];
            const result = validation(value);
            let update = {...errors};
            if (!result) update[name] = message;
            else delete update[name];
            setErrors({...update});
        }
        setValues({...values, [target.name]: target.value});
    }
    const setValue = (specs) => setValues({...values, ...specs});

    return [values, handleChange, reset, errors, setValue];

}
