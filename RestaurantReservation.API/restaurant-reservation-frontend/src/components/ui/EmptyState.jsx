function EmptyState({
    message = "No hay datos disponibles."
}) {
    return (
        <div className="text-center text-muted py-5">
            {message}
        </div>
    );
}

export default EmptyState;