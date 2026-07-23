/**
 * StatCard — dashboard metric card.
 *
 * Props:
 *   icon   — ReactNode
 *   label  — string
 *   value  — string | number
 *   color  — CSS color string (for icon background tint)
 *   trend  — string (optional, e.g. '+5 this month')
 */
export default function StatCard({ icon, label, value, color = '#2563eb', trend }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: color + '18', color }}>
        {icon}
      </div>
      <div className="stat-body">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {trend && <div className="stat-trend">{trend}</div>}
      </div>
    </div>
  );
}
