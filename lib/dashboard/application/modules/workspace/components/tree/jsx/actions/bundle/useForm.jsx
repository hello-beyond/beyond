const useForm = (initialState = {}) => {

    const [values, setValues] = React.useState(initialState);
    const [errorName, setErrorName] = React.useState(false);
    const [errorRute, setErrorRute] = React.useState(false);

    const reset = () => {
        setValues(initialState);
    }

    const handleInputChange = ({target}) => {

        setValues({
            ...values,
            [target.name]: target.value
        });
        setErrorName(false);
        setErrorRute(false);
    }

    return [values, handleInputChange, reset, errorName, setErrorName, errorRute, setErrorRute];

}
