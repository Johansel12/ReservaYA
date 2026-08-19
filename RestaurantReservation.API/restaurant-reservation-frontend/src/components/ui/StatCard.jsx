function StatCard({ label, value }) {
    return (
        <div className="card-app stat-card h-100">
            <div className="stat-label">
                {label}
            </div>

            <div className="stat-value">
                {value}
            </div>
        </div>
    );
}

export default StatCard;