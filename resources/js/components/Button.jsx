function Button({
    children,
    type = null,
    disabled = null,
    onClick = null,
    onSubmit = null,
    mt = null,
    className = null,
}) {
    const style = {
        marginTop: mt,
    };
    return (
        <button
            className={"primaryBtn " + className}
            onClick={onClick}
            disabled={disabled}
            onSubmit={onSubmit}
            type={type}
            style={style}
        >
            {children}
        </button>
    );
}

export default Button;
