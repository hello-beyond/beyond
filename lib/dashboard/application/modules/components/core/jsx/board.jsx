export const DSBoard = ({children, className}) => {
    const cls = `ds__board ${className ? `${className}` : ''}`;
    return (
        <div className={cls}>
            {children}
        </div>
    );
};
