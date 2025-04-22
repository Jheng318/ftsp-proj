function CardButton({ children, onClick = null, btnColor }) {
    const btnStyle = {
        backgroundColor: btnColor,
        border: "unset",
        padding: "0.3rem 1.5rem",
        borderRadius: "10px",
    };
    return (
        <button onClick={onClick} style={btnStyle}>
            {children}
        </button>
    );
}

export default CardButton;
