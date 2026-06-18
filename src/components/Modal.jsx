import { createPortal } from "react-dom"

export default function Modal({
    title = "Titolo",
    content = "Contenuto principale",
    show = false,
    onClose,
    onConfirm,
    confirmText = "Conferma"
}) {
    //se show è falso allora ritorno null
    if (!show) return null

    return createPortal(
        <div className="modal-container">
            <div className="modal-card">
                <h1>{title}</h1>
                
                {/* Sostituito <p> con <div> per poter ospitare sia testi che form HTML validi */}
                <div>{content}</div>

                <button onClick={onClose}>Annulla</button>
                <button onClick={onConfirm}>{confirmText}</button>
            </div>
        </div>,
        document.getElementById("modal-root") //destinazione nel mio html
    )
}