export function Link({children, to}) {

    const navigate = event => {
        event.preventDefault();
        beyond.pushState(to)
    };

    return (
        <span onClick={navigate}>
            {children}
        </span>
    )
}