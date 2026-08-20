function ConfirmDialog({
    show,
    title,
    message,
    onConfirm,
    onClose
}) {
    if (!show) return null;

    return (
        <>
            <div
                className="modal-backdrop-custom"
                onClick={onClose}
            />

            <div className="modal-custom">
                <div className="modal-custom-content">

                    <h5 className="mb-3">
                        ⚠ {title}
                    </h5>

                    <p className="text-muted mb-4">
                        {message}
                    </p>

                    <div className="d-flex justify-content-end gap-2">
                        <button
                            className="btn btn-outline-secondary"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={onConfirm}
                        >
                            Eliminar
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default ConfirmDialog;
