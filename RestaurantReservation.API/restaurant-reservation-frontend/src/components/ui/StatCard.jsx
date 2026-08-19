function StatCard({ label, value }) {
    return (
        <div className="card h-100">
            <div className="card-body">
                <p className="text-muted mb-1">
                    {label}
                </p>

                <h2 className="mb-0">
                    {value}
                </h2>
            </div>
        </div>
    );
}

export default StatCard;