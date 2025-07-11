import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ children, open, onClose, className = " " }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} onClose={onClose} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;
