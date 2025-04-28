import { useEffect, useRef } from "react";

function Modal({ isOpen, children, onClose }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const dialogNode = dialogRef.current;

        if (!dialogNode.open) {
            dialogNode.showModal();
        }

        // Cleanup function
        return () => {
            if (dialogNode && dialogNode.open) {
                dialogNode.close();
            }
        };
    }, [isOpen]);

    const handleClose = () => {
        const dialogNode = dialogRef.current;
        if (dialogNode && dialogNode.open) {
            onClose();
            dialogNode.close();
        }
        // if (onClose) {
        // }
    };

    const handleBackdropClick = (event) => {
        if (event.target === dialogRef.current) {
            handleClose();
        }
    };

    return (
        <dialog ref={dialogRef} onClick={handleBackdropClick} id="modal">
            {children}
        </dialog>
    );
}

export default Modal;
