function CardButton({ children, onClick = null, btnColor, id = null }) {
    const btnStyle = {
        backgroundColor: btnColor,
        border: "unset",
        padding: "0.3rem 1.5rem",
        borderRadius: "10px",
    };
    return (
        <button onClick={onClick} style={btnStyle} data-id={id}>
            {children}
        </button>
    );
}

export default CardButton;
