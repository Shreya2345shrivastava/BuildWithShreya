interface DashboardCardProps {
  title: string;
  value: string;
  icon?: string;
}

export function DashboardCard({
  title,
  value,
  icon,
}: DashboardCardProps) {
  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="dashboard-subtitle text-sm">
            {title}
          </p>

          <h3 className="dashboard-title text-2xl mt-2">
            {value}
          </h3>
        </div>

        <div className="text-4xl">
          {icon}
        </div>
      </div>
    </div>
  );
}