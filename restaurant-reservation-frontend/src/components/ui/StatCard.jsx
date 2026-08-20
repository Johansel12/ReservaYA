function StatCard({ label, value, icon }) {
    return (
        <div className="card-app stat-card h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="stat-label">
                    {label}
                </div>

                <div className="stat-icon">
                    {icon}
                </div>
            </div>

            <div className="stat-value">
                {value}
            </div>
        </div>
    );
}

export default StatCard;