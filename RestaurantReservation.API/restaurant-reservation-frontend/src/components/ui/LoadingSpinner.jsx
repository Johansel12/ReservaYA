function LoadingSpinner({ label = "Cargando..." }) {
    return (
        <div className="d-flex align-items-center gap-2">
            <div
                className="spinner-border spinner-border-sm"
                role="status"
            ></div>

            <span>{label}</span>
        </div>
    );
}

export default LoadingSpinner;